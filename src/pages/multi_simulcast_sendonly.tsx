import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import ColDebug from "@/components/ColDebug";
import ColDemo from "@/components/ColDemo";
import Footer from "@/components/Footer";
import Head from "@/components/Head";
import Header from "@/components/Header";
import { disconnectSora, setInitialParameter, setMediaDevices } from "@/slice";
import { EnabledParameters, getDefaultVideoCodecType } from "@/utils";

const ENABLED_PARAMETERS: EnabledParameters = {
  audio: true,
  audioBitRate: true,
  audioCodecType: true,
  audioInput: true,
  audioOutput: true,
  audioTrack: true,
  autoGainControl: true,
  cameraDevice: true,
  channelId: true,
  clientId: true,
  dataChannel: true,
  displayResolution: true,
  e2ee: true,
  echoCancellation: true,
  echoCancellationType: true,
  frameRate: true,
  mediaType: true,
  metadata: true,
  micDevice: true,
  noiseSuppression: true,
  resolution: true,
  signalingNotifyMetadata: true,
  video: true,
  videoBitRate: true,
  videoCodecType: true,
  videoInput: true,
  videoTrack: true,
};

const MultiSimulcastSendonly: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setInitialParameter({
        audioCodecType: "OPUS",
        videoCodecType: getDefaultVideoCodecType("VP8"),
        videoBitRate: "3000",
        resolution: "HD",
      })
    );
    dispatch(setMediaDevices());
    return () => {
      dispatch(disconnectSora());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head title={"multi simulcast sendonly"} />
      <Header pageName="multi simulcast sendonly" enabledParameters={ENABLED_PARAMETERS} />
      <main role="main">
        <div className="container">
          <div className="row">
            <ColDemo connectType="sendonly" multistream simulcast enabledParameters={ENABLED_PARAMETERS} />
            <ColDebug />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MultiSimulcastSendonly;
