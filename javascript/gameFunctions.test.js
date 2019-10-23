import {gameSetup} from "./gameFunctions.js"

describe("Test game set up", () => {
  test("Check ball box centered", () => {
    document.body.innerHTML = '<div id="ball-box"><div id="ball"></div></div>';
    gameSetup();
    let ballStyle = document.getElementById('ball-box').style;

    expect(ballStyle.width).toBe("10vw");
    expect(ballStyle.height).toBe("10vh");
    expect(ballStyle.left).toBe("45vw");
    expect(ballStyle.top).toBe("45vh");
  });
})