import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import ColDebug from "@/components/ColDebug";
import ColDemo from "@/components/ColDemo";
import Head from "@/components/Head";
import Header from "@/components/Header";
import { disconnectSora, setInitialParameter, setMediaDevices } from "@/slice";

const ENABLED_PARAMETERS = {
  audio: true,
  audioOutput: true,
  channelId: true,
  simulcastQuality: true,
  video: true,
};

const MultiSimulcastRecvonly: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setInitialParameter({
        simulcastQuality: "low",
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
      <Head title={"multi simulcast recvonly"} />
      <Header pageName="multi simulcast recvonly" enabledParameters={ENABLED_PARAMETERS} />
      <main role="main">
        <div className="container">
          <div className="row">
            <ColDemo connectType="recvonly" multistream simulcast enabledParameters={ENABLED_PARAMETERS} />
            <ColDebug />
          </div>
        </div>
      </main>
    </>
  );
};

export default MultiSimulcastRecvonly;
