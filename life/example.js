import { LifeGame } from 'lifegame';
import {} from 'piu/MC';
import Timer from 'timer';
const EVENT_ONGAMEINIT = 'onGameInit';
class LifeGameBehavior extends Behavior {
    onCreate(port) {
        this.lifeGame = new LifeGame({
            width: 32,
            height: 24,
        });
        Timer.repeat(() => {
            this.lifeGame?.tick();
            port.invalidate();
        }, 125);
        this.onGameInit();
    }
    onGameInit() {
        this.lifeGame?.init();
    }
    onDraw(port) {
        port.fillColor('black', 0, 0, 320, 240);
        this.lifeGame?.cells.forEach((c) => {
            const top = LifeGame.top(c);
            const left = LifeGame.left(c);
            port.fillColor('white', left * 10, top * 10, 8, 8);
        });
    }
}
const lifeGamePort = new Port(null, {
    Behavior: LifeGameBehavior,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
});

const application = new Application(null, {
    skin: new Skin({
        fill: 'black',
    }),
    contents: [lifeGamePort],
    displayListLength: 4096,
    commandListLength: 4096,
});
if (global.button != null) {
    button.a.onChanged = function () {
        if (this.read()) {
            lifeGamePort.delegate(EVENT_ONGAMEINIT);
        }
    };
}
