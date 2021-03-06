import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Sora from "sora-js-sdk";

import { SoraDemoState } from "@/slice";

type Props = {
  pageName: string;
};
const DownloadReport: React.FC<Props> = (props) => {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const state = useSelector((state: SoraDemoState) => state);
  const { statsReport } = state.soraContents;
  const onClick = async (): Promise<void> => {
    const parametersReport = {
      audio: state.audio,
      audioBitRate: state.audioBitRate,
      audioCodecType: state.audioCodecType,
      audioInput: state.audioInput,
      audioInputDevices: state.audioInputDevices,
      audioOutput: state.audioOutput,
      audioOutputDevices: state.audioOutputDevices,
      autoGainControl: state.autoGainControl,
      channelId: state.channelId,
      debug: state.debug,
      googCpuOveruseDetection: state.googCpuOveruseDetection,
      echoCancellation: state.echoCancellation,
      echoCancellationType: state.echoCancellationType,
      frameRate: state.frameRate,
      mediaType: state.mediaType,
      noiseSuppression: state.noiseSuppression,
      resolution: state.resolution,
      simulcastRid: state.simulcastRid,
      spotlight: state.spotlight,
      spotlightNumber: state.spotlightNumber,
      video: state.video,
      videoBitRate: state.videoBitRate,
      videoCodecType: state.videoCodecType,
      videoInput: state.videoInput,
      videoInputDevices: state.videoInputDevices,
    };
    const report = {
      userAgent: navigator.userAgent,
      pageName: props.pageName,
      "sora-demo": state.version,
      "sora-js-sdk": Sora.version(),
      parameters: parametersReport,
      log: state.logMessages.map((logMessage) => {
        // Redux non-serializable value 対応で log を string にして保存してあるため parse する
        return {
          timestamp: logMessage.timestamp,
          message: {
            title: logMessage.message.title,
            description: JSON.parse(logMessage.message.description),
          },
        };
      }),
      notify: state.notifyMessages,
      stats: statsReport,
    };
    const data = JSON.stringify(report);
    const blob = new Blob([data], { type: "text/plain" });
    window.URL = window.URL || window.webkitURL;
    if (anchorRef.current) {
      const datetimeString = new Date().toISOString().replaceAll(":", "_").replaceAll(".", "_");
      anchorRef.current.download = `sora-demo-report-${datetimeString}.json`;
      anchorRef.current.href = window.URL.createObjectURL(blob);
      anchorRef.current.click();
    }
  };
  return (
    <>
      <input
        className="btn btn-light btn-sm ml-1"
        type="button"
        name="downloadReport"
        defaultValue="Download report"
        onClick={onClick}
      />
      <a ref={anchorRef} style={{ display: "none" }} />
    </>
  );
};

export default DownloadReport;
