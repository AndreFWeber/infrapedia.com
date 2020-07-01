import { fCollectionFormat } from '../../helpers/featureCollection'
import { mapConfig } from '../../config/mapConfig.js'
import turf from '@turf/turf'

export function LastMileToolLayers(map) {
  const fc = fCollectionFormat()

  map.addSource('lines', {
    type: 'geojson',
    data: fc
  })

  map.addLayer({
    id: 'line',
    type: 'line',
    source: 'lines',
    paint: {
      'line-color': '#FF0000',
      'line-width': 2
    },
    filter: ['==', '$type', 'LineString']
  })

  map.addLayer({
    id: 'line-label',
    source: 'lines',
    name: 'Production Backbone',
    type: 'symbol',
    layout: {
      'text-field': ['get', 'distance'],
      'symbol-placement': 'line',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 10,
      'text-justify': 'right',
      'text-anchor': 'bottom',
      'text-offset': [0, 0.1]
    },
    paint: {
      'text-color': '#485E69'
    }
  })

  map.addSource('points', {
    type: 'geojson',
    data: fc
  })

  map.addLayer({
    id: 'point',
    type: 'circle',
    source: 'points',
    paint: {
      'circle-radius': 5,
      'circle-color': '#35af6d',
      'circle-stroke-width': 1,
      'circle-stroke-color': '#333333'
    },
    filter: ['==', '$type', 'Point']
  })

  //finish layer
  map.addSource('finishpoint', {
    type: 'geojson',
    data: fc
  })

  map.addLayer({
    id: 'finish',
    type: 'circle',
    source: 'finishpoint',
    paint: {
      'circle-radius': 5,
      'circle-color': '#FF00C4',
      'circle-stroke-width': 1,
      'circle-stroke-color': '#333333'
    },
    filter: ['==', '$type', 'Point']
  })
}

export default class lastMileTool {
  constructor({ map }) {
    this.limit = 1
    this.map = map
    this.latlng = null
    this.googlemap = null
    this.requestType = 'google'
    this.directionsService = null
  }

  find(e) {
    this.latlng = e
    this.map.setCenter(e)
    this.map.on('idle', function(f) {
      const distances = [500, 750, 1000, 1500, 2000, 2500, 3000]
      const point = this.map.project(this.latlng)
      const x = point.x
      const y = point.y
      let features = []
      for (let dist of distances) {
        features = this.map.queryRenderedFeatures(
          // bbox
          [
            [x - dist, y - dist],
            [x + dist, y + dist]
          ],
          {
            layers: [mapConfig.cables]
          }
        )
        if (features.length > 0) {
          break
        }
      }

      if (features.length == 0) {
        var zoom = this.map.getZoom()
        this.map.setZoom(zoom - 1)
      } else {
        f.target._listeners.idle = []
        let geojson = fCollectionFormat()
        const lastFeatures = []
        features.map(function(feature) {
          let geojson2 = feature.toJSON()
          lastFeatures.push(geojson2)
        })
        if (lastFeatures.length > 0) {
          geojson.features = lastFeatures
        }

        const nearestPoints = []
        const pt = turf.point([this.latlng[0], this.latlng[1]])
        if (geojson.features.length > 0) {
          geojson.features.map(function(feature) {
            const snapped = turf.nearestPointOnLine(feature, pt, {
              units: 'kilometers'
            })
            nearestPoints.push({
              feature: feature,
              distance: snapped.properties.dist,
              point: snapped
            })
          })
        }
        let sortList = nearestPoints.sort((a, b) => a.distance - b.distance)
        if (sortList.length > this.limit) {
          sortList = sortList.splice(0, this.limit)
        }
        this.map.getSource('finishpoint').setData(sortList[0].point)
        if (sortList.length > 0) {
          const shortestGoogleLines = []
          // eslint-disable-next-line no-inner-declarations
          function findGooglePath(i) {
            if (i < sortList.length) {
              const pnt = sortList[i].point.geometry.coordinates
              this.calcRoute(this.latlng, pnt, function(path) {
                shortestGoogleLines.push(path)
                i++
                findGooglePath(i)
              })
            } else {
              const sortGoogleList = shortestGoogleLines.sort(
                (a, b) => a.properties.len - b.properties.len
              )
              const shortPath = this.findIntersects(sortGoogleList, geojson)
              this.map.getSource('lines').setData(shortPath.line)
              this.map.getSource('finishpoint').setData(shortPath.point)
            }
          }
          findGooglePath(0)
        }
      }
    })
  }
  findIntersects(roads, cables) {
    const shortest = []
    const start = turf.point(this.latlng)
    roads.forEach(function(road) {
      var last = turf.point(
        road.geometry.coordinates[road.geometry.coordinates.length - 1]
      )
      cables.features.forEach(function(cable) {
        var intersects = turf.lineIntersect(cable, road)
        let length
        if (intersects.features.length > 0) {
          for (let stop of intersects.features) {
            let sliced = turf.lineSlice(start, stop, road)
            length = turf.length(sliced, { units: 'meters' })
            shortest.push({ lastpoint: stop, len: length, line: sliced })
          }
        } else {
          length = turf.length(road, { units: 'meters' })
          shortest.push({ lastpoint: last, len: length, line: road })
        }
      })
    })
    const shortestList = shortest.sort((a, b) => a.len - b.len)
    return { line: shortestList[0].line, point: shortestList[0].lastpoint }
  }
  initGoogleServices() {
    // eslint-disable-next-line
    this.googlemap = new google.maps.Map(document.getElementById('googlemap'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    })
    // eslint-disable-next-line
    this.directionsService = new google.maps.DirectionsService()
  }
  calcRoute(start, finish, callback) {
    if (this.requestType == 'google') {
      let route = {}
      // eslint-disable-next-line
      const startPoint = new google.maps.LatLng(start[1], start[0])
      // eslint-disable-next-line
      const finishPoint = new google.maps.LatLng(finish[1], finish[0])
      const request = {
        origin: startPoint,
        destination: finishPoint,
        travelMode: 'WALKING'
      }

      this.directionsService.route(request, function(result, status) {
        if (status == 'OK') {
          var waypoints = result.routes[0].overview_path
          var waypointsArr = []
          waypoints.map(function(pnt) {
            waypointsArr.push([pnt.lng(), pnt.lat()])
          })
          var distancetext = result.routes[0].legs[0].distance.text
          var distanceval = result.routes[0].legs[0].distance.value
          route = {
            type: 'Feature',
            properties: { distance: distancetext, len: distanceval },
            geometry: { type: 'LineString', coordinates: waypointsArr }
          }
          callback(route)
        } else {
          route = {
            type: 'Feature',
            properties: { distance: 0, len: 0 },
            geometry: { type: 'LineString', coordinates: [start, finish] }
          }
          var lenn = turf.length(route, { units: 'meters' })
          lenn = turf.round(lenn, 3)
          route.properties.len = lenn
          if (lenn >= 1000) {
            var lennkm = turf.length(route, { units: 'kilometers' })
            lennkm = turf.round(lennkm, 3)
            route.properties.distance = lennkm + 'km'
          } else {
            route.properties.distance = lenn + 'm'
          }
          callback(route)
        }
      })
    } else if (this.requestType == 'mapbox') {
      const url =
        'https://api.mapbox.com/directions/v5/mapbox/walking/' +
        start[0] +
        ',' +
        start[1] +
        ';' +
        finish[0] +
        ',' +
        finish[1] +
        '.json?geometries=polyline&steps=true&overview=full&language=en&access_token=' +
        this.config.mapboxglAccessToken
      fetch(url)
        .then(res => res.json())
        .then(function(result) {
          callback(this.getMapboxRoad(result))
        })
    }
  }
  changeLimit(e) {
    this.limit = e.value
  }
  changeRequestType(e) {
    this.requestType = e.value
  }
  getMapboxRoad(data) {
    const routes = data.routes[0]
    const distance = turf.round(routes.distance, 3)
    const ll = this.googlePointDecode(routes.geometry)
    const line = turf.lineString(ll, { distance: distance, len: distance })
    return line
  }
  googlePointDecode(encoded) {
    var points = []
    var index = 0,
      len = encoded.length
    var lat = 0,
      lng = 0
    while (index < len) {
      var b,
        shift = 0,
        result = 0
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63 //finds ascii                                                                                    //and substract it by 63
        result |= (b & 0x1f) << shift
        shift += 5
      } while (b >= 0x20)

      var dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1
      lat += dlat
      shift = 0
      result = 0
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63
        result |= (b & 0x1f) << shift
        shift += 5
      } while (b >= 0x20)
      var dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1
      lng += dlng

      points.push({ lat: lat / 1e5, lng: lng / 1e5 })
    }
    var pointArray = []
    points.map(function(a) {
      var lat = a.lat
      var lng = a.lng
      pointArray.push([lng, lat])
    })
    return pointArray
  }
}
