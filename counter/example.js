const FONT = 'OpenSans-Regular-52'

const counter = new Container(null, {
  top: 0, bottom: 0, left: 0, right: 0,
  contents: [
    new Label(null, {
      style: new Style({ font: FONT, color: 'white' }),
      skin: new Skin({ fill: 'black' }),
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      string: '0'
    })
  ]
})

const counts = {
  a: 0
}

function countup (button) {
  counts[button] += 1
  trace(counts[button])
  counter.first.string = String(counts[button])
}

global.button.a.onChanged = function () {
  const v = this.read()
  if (v) {
    countup('a')
  }
}

application.add(counter);
