import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SANDIFY_FILES_ROOT_URL } from "../exporter/Downloader";
import { replaceLayers } from "../../features/layers/layersSlice";

// This is used to receive drawing layers data from Sandify-files
export const FileReceiver = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const listener = (event) => {
      // on receiving a message
      if (
        // if it's from sandify-files domain
        event.origin === SANDIFY_FILES_ROOT_URL &&
        // and is the correct type
        event.data?.type === "sandify:drawingData"
      ) {
        // use the message data to replace the current drawing layers
        const byId = Object.fromEntries(
          event.data.layers.map((layer) => [layer.id, layer])
        );
        dispatch(
          replaceLayers({
            byId,
            allIds: Object.keys(byId),
          })
        );
        // leaving listener active to let the user go back to sandify-files table and select another drawing
      }
    };

    window.addEventListener("message", listener, false);
    if (window?.opener) {
      // If current window was opened by another window, send a message to indicate that we are
      // ready to receive drawing data
      window?.opener.postMessage(
        {
          type: "sandify:readyForDrawingData",
        },
        // only send this message to Sandify-files domain
        SANDIFY_FILES_ROOT_URL.endsWith("/")
          ? SANDIFY_FILES_ROOT_URL
          : `${SANDIFY_FILES_ROOT_URL}/`
      );
    }

    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);

  return null;
};
