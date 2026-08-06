import { MODULE_ID } from "./constants.js";
import { brfbSocket } from "./socket.js";

function getRandomParkourDestination(token) {

  const gridSize = canvas.dimensions.size;

  for (let i = 0; i < 20; i++) {

const distance =
  Math.floor(Math.random() * 6) + 5; // 5-10

const angle =
  Math.random() * Math.PI * 2;

const dx =
  Math.round(
    Math.cos(angle) * distance
  );

const dy =
  Math.round(
    Math.sin(angle) * distance
  );

    if (distance < 5 || distance > 10) continue;

    const x = token.document.x + dx * gridSize;

    const y = token.document.y + dy * gridSize;

    const collision = CONFIG.Canvas.polygonBackends.move.testCollision(
        { x: token.center.x, y: token.center.y },
        	{
	          x: x + token.w / 2,
    	      y: y + token.h / 2
        	},
        	{
          		type: "move"
        	}
    );

    if (!collision.length) {
      return { x, y };
    }
  }

  return null;
}

export async function requestParkour(tokenId) {

  ui.notifications.info(
    "Click a destination."
  );

  const token =
    canvas.tokens.get(tokenId);

  if (!token) return;

  canvas.stage.once(
    "pointerdown",
    async event => {

      const pos =
        event.data.getLocalPosition(
          canvas.stage
        );

      const gridSize =
        canvas.dimensions.size;

      const x =
        Math.round(pos.x / gridSize) *
        gridSize;

      const y =
        Math.round(pos.y / gridSize) *
        gridSize;

      const collision =
        CONFIG.Canvas
          .polygonBackends
          .move
          .testCollision(
            {
              x: token.center.x,
              y: token.center.y
            },
            {
              x: x + token.w / 2,
              y: y + token.h / 2
            },
            {
              type: "move"
            }
          );

      if (collision.length) {

        ui.notifications.warn(
          "No Can Do. There's a Wall."
        );

        return;
      }

      await brfbSocket.executeAsGM(
        "playParkour",
        tokenId,
        { x, y }
      );
    }
  );
}

export async function parkour(tokenId) {
	await brfbSocket.executeAsGM("playParkour", tokenId);
}


export async function playParkour(
  tokenId,
  destination
) {

  const token =
    canvas.tokens.get(tokenId);

  if (!token) return;

  await brfbSocket.executeForEveryone(
    "floatingTextOnToken",
    tokenId,
    "🏃 PARKOUR!",
    3000,
    "#00ff00",
    true
  );

  await brfbSocket.executeForEveryone(
    "playGlobalSound",
    "parkour.mp3"
  );

  await token.document.update(
    destination,
    {
      animate: true
    }
  );
}

/*export async function playParkour(tokenId) {
	const token = canvas.tokens.get(tokenId);
	if (!token) { return; }

	const destination = getRandomParkourDestination(token);

	if (!destination) {
		ui.notifications.warn(
			"Nowhere to parkour!"
		);

		return;
	}

	await brfbSocket.executeForEveryone("floatingTextOnToken", tokenId, "🏃 PARKOUR!", 3000, "#00ff00", true);

	await brfbSocket.executeForEveryone("playGlobalSound", "parkour.mp3");

	// await new Sequence().effect().atLocation(token).file("jb2a.jump.01").play();

	await token.document.update(destination, { animate: true });
}*/