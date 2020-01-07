import createControlButton from './createControlButton'

class EditorControls {
  constructor({ draw, $dispatch, scene, isCLS, handleBeforeFeatureCreation }) {
    this.draw = draw
    this.scene = scene
    this.isCLS = isCLS
    this.$dispatch = $dispatch
    this.resetScene = this.resetScene
    this.updateControls = this.updateControls
    this.handleBeforeFeatureCreation = handleBeforeFeatureCreation
    this.handleDrawSelectionChange = this.handleDrawSelectionChange
  }

  onAdd() {
    this.controlGroup = document.createElement('div')
    this.controlGroup.className = 'mapboxgl-ctrl-group mapboxgl-ctrl'
    this.buttons = this.createButtons()
    return this.controlGroup
  }

  onRemove() {
    this.controlGroup.parentNode.removeChild(this.controlGroup)
  }

  createButtons() {
    return {
      line_string: createControlButton('line_string', {
        container: this.controlGroup,
        className: 'editor-ctrl editor-line-string',
        title: 'Draw line',
        visible: this.isCLS ? false : true,
        eventListener: () => {
          this.$dispatch('editor/beginCreation')
          this.draw.changeMode(this.draw.modes.DRAW_LINE_STRING)
        }
      }),

      point: createControlButton('point', {
        container: this.controlGroup,
        className: 'editor-ctrl editor-point',
        title: 'Create point',
        visible: true,
        eventListener: () => {
          this.$dispatch('editor/beginCreation')
          this.draw.changeMode(this.draw.modes.DRAW_POINT)
        }
      }),

      editProperties: createControlButton('edit-properties', {
        container: this.controlGroup,
        className: 'editor-ctrl editor-edit-properties',
        title: 'Edit properties',
        eventListener: () => {
          let featureId = this.scene.features.selected[0].id
          let features = this.scene.features.list.filter(
            f => f.id === featureId
          )
          let feature = features.length ? features[0] : null
          if (feature) {
            console.log(feature)
          }
        }
      }),

      trash: createControlButton('trash', {
        container: this.controlGroup,
        className: 'editor-ctrl editor-trash',
        title: 'Delete',
        eventListener: () => {
          this.$dispatch('editor/selectionChange', this.draw.getSelected())
          this.featureDeleted()
        }
      }),

      ok: createControlButton('ok', {
        container: this.controlGroup,
        className: 'editor-ctrl editor-ok',
        title: 'Accept',
        eventListener: () => this.handleFeatureCreation()
      }),

      cancel: createControlButton('cancel', {
        container: this.controlGroup,
        className: 'editor-ctrl editor-cancel',
        title: 'Cancel',
        eventListener: () => {
          this.$dispatch('editor/selectionChange', this.draw.getSelected())
          const creations = this.draw.getAll()
          const savedFeats = Array.from(this.scene.features.list).map(
            feat => feat.id
          )
          const { selected } = this.scene.features

          if (this.scene.creation) {
            // We are deleting the selected and just created draw(s)
            if (selected && selected.length) {
              for (let feat of selected) {
                this.draw.delete(feat.id)
              }
            } else if (creations.features.length) {
              // Otherwise if the user has created draw(s) but he un-selected them
              // We are checking for ones which aren't saved on the store and deleting them
              for (let feat of creations.features) {
                if (!savedFeats.includes(feat.id)) {
                  this.draw.delete(feat.id)
                }
              }
            }
            this.resetScene()
          } else if (this.scene.edition) {
            // Deleting all draws
            this.draw.trash()
            // Because you cancel the edition we need to recreate all the draw(s) again
            // It will work like this for now, but I know it can't be cost-effective
            const savedFeatures = Array.from(this.scene.features.list, i => ({
              ...i.feature
            }))
            for (let feat of savedFeatures) {
              this.draw.add(feat)
            }
            this.resetScene()
          }
        }
      })
    }
  }

  resetScene(isResetList) {
    this.$dispatch('editor/resetScene')
    this.draw.changeMode(this.draw.modes.SIMPLE_SELECT)
    if (isResetList) this.$dispatch('editor/resetList')
  }

  featureDeleted() {
    const { selected } = this.scene.features
    if (selected && selected.length) {
      for (let feat of selected) {
        this.$dispatch('editor/deleteFeature', feat.id)
      }
      this.draw.trash()
      this.resetScene()
    }
  }

  updateControls(scene = this.scene) {
    if (scene.creation || scene.edition) {
      this.buttons.ok.style.setProperty('display', 'block')
      this.buttons.cancel.style.setProperty('display', 'block')
      this.buttons.trash.style.setProperty('display', 'block')

      this.buttons.point.style.setProperty('display', 'none')
      this.buttons.line_string.style.setProperty('display', 'none')

      if (scene.edition) {
        this.buttons.editProperties.style.setProperty('display', 'block')
      }
    } else if (!scene.creation || !scene.edition) {
      this.buttons.ok.style.setProperty('display', 'none')
      this.buttons.cancel.style.setProperty('display', 'none')
      this.buttons.trash.style.setProperty('display', 'none')

      this.buttons.point.style.setProperty('display', 'block')
      if (!this.isCLS) {
        this.buttons.line_string.style.setProperty('display', 'block')
      } else {
        this.buttons.line_string.style.setProperty('display', 'none')
      }
    }
  }

  handleDrawSelectionChange(features) {
    if (!this.scene.edition && !this.scene.creation && features.length) {
      this.$dispatch('editor/beginEdition')
      this.$dispatch('editor/selectionChange', { features })
    }
  }

  async handleFeatureCreation() {
    this.$dispatch('editor/selectionChange', this.draw.getSelected())
    const { features, edition, creation } = this.scene

    if (creation) {
      if (features && features.selected.length) {
        const featWProps = await this.handleBeforeFeatureCreation({
          id: features.selected[0].id,
          feature: { ...features.selected[0] },
          type: features.selected[0].geometry.type
        })

        await this.$dispatch('editor/confirmCreation', featWProps)
      } else return
    } else if (edition) {
      this.$dispatch('editor/editFeature', features.selected)
    }

    this.resetScene()
  }
}

export default EditorControls
