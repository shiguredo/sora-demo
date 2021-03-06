import React from "react";
import { useSelector } from "react-redux";

import AlertMessages from "@/components/AlertMessages";
import ButtonConnect from "@/components/Button/Connect";
import ButtonDisconnect from "@/components/Button/Disconnect";
import ReloadDevices from "@/components/Button/ReloadDevices";
import ButtonRequestRtpStream from "@/components/Button/RequestRtpStream";
import ButtonResetRtpStream from "@/components/Button/ResetRtpStream";
import ButtonStartRecording from "@/components/Button/StartRecording";
import ButtonStopRecording from "@/components/Button/StopRecording";
import FormAudio from "@/components/Form/Audio";
import FormAudioBitRate from "@/components/Form/AudioBitRate";
import FormAudioCodecType from "@/components/Form/AudioCodecType";
import FormAudioInput from "@/components/Form/AudioInput";
import FormAudioOutput from "@/components/Form/AudioOutput";
import FormAudioTrack from "@/components/Form/AudioTrack";
import FormAutoGainControl from "@/components/Form/AutoGainControl";
import FormCameraDevice from "@/components/Form/CameraDevice";
import FormChannelId from "@/components/Form/ChannelId";
import FormClientId from "@/components/Form/ClientId";
import FormDataChannelSignaling from "@/components/Form/DataChannelSignaling";
import FormDisplayResolution from "@/components/Form/DisplayResolution";
import FormE2EE from "@/components/Form/E2EE";
import FormEchoCancellation from "@/components/Form/EchoCancellation";
import FormEchoCancellationType from "@/components/Form/EchoCancellationType";
import FormEnabledClientId from "@/components/Form/EnabledClientId";
import FormEnabledDataChannel from "@/components/Form/EnabledDataChannel";
import FormEnabledMetadata from "@/components/Form/EnabledMetadata";
import FormEnabledSignalingNotifyMetadata from "@/components/Form/EnabledSignalingNotifyMetadata";
import FormFrameRate from "@/components/Form/FrameRate";
import FormIgnoreDisconnectWebSocket from "@/components/Form/IgnoreDisconnectWebSocket";
import FormMediaType from "@/components/Form/MediaType";
import FormMetadata from "@/components/Form/Metadata";
import FormMicDevice from "@/components/Form/MicDevice";
import FormNoiseSuppression from "@/components/Form/NoiseSuppression";
import FormResolution from "@/components/Form/Resolution";
import FormSignalingNotifyMetadata from "@/components/Form/SignalingNotifyMetadata";
import FormSimulcastRid from "@/components/Form/SimulcastRid";
import FormSpotlight from "@/components/Form/Spotlight";
import FormSpotlightFocusRid from "@/components/Form/SpotlightFocusRid";
import FormSpotlightNumber from "@/components/Form/SpotlightNumber";
import FormSpotlightUnfocusRid from "@/components/Form/SpotlightUnfocusRid";
import FormVideo from "@/components/Form/Video";
import FormVideoBitRate from "@/components/Form/VideoBitRate";
import FormVideoCodecType from "@/components/Form/VideoCodecType";
import FormVideoInput from "@/components/Form/VideoInput";
import FormVideoTrack from "@/components/Form/VideoTrack";
import LocalVideo from "@/components/Video/LocalVideo";
import RemoteVideos from "@/components/Video/RemoteVideos";
import { SoraDemoState } from "@/slice";
import { ConnectType, EnabledParameters } from "@/utils";

type Props = {
  connectType: ConnectType;
  multistream?: boolean;
  simulcast?: boolean;
  spotlight?: boolean;
  enabledParameters: EnabledParameters;
};
const ColDemo: React.FC<Props> = (props) => {
  const debug = useSelector((state: SoraDemoState) => state.debug);
  const enabledClientId = useSelector((state: SoraDemoState) => state.enabledClientId);
  const enabledDataChannel = useSelector((state: SoraDemoState) => state.enabledDataChannel);
  const enabledMetadata = useSelector((state: SoraDemoState) => state.enabledMetadata);
  const enabledSignalingNotifyMetadata = useSelector((state: SoraDemoState) => state.enabledSignalingNotifyMetadata);
  return (
    <div className={debug ? "col-demo col-6" : "col-demo col-12"}>
      <AlertMessages />
      <div className="form-row align-items-center py-1">
        {props.enabledParameters.mediaType ? <FormMediaType /> : null}
      </div>
      <div className="form-row align-items-center">
        {props.enabledParameters.channelId ? <FormChannelId /> : null}
        {props.enabledParameters.clientId ? <FormEnabledClientId /> : null}
        {props.enabledParameters.metadata ? <FormEnabledMetadata /> : null}
        {props.enabledParameters.signalingNotifyMetadata ? <FormEnabledSignalingNotifyMetadata /> : null}
        {props.enabledParameters.dataChannel ? <FormEnabledDataChannel /> : null}
        {props.enabledParameters.spotlight ? <FormSpotlight /> : null}
        {props.enabledParameters.spotlightNumber ? <FormSpotlightNumber /> : null}
        {props.enabledParameters.e2ee ? <FormE2EE /> : null}
      </div>
      <div className="form-row align-items-center">
        {props.enabledParameters.clientId && enabledClientId ? <FormClientId /> : null}
      </div>
      <div className="form-row align-items-center">
        {props.enabledParameters.metadata && enabledMetadata ? <FormMetadata /> : null}
      </div>
      <div className="form-row align-items-center">
        {props.enabledParameters.signalingNotifyMetadata && enabledSignalingNotifyMetadata ? (
          <FormSignalingNotifyMetadata />
        ) : null}
      </div>
      <div className="form-row align-items-center">
        {props.enabledParameters.dataChannel && enabledDataChannel ? (
          <>
            <FormDataChannelSignaling />
            <FormIgnoreDisconnectWebSocket />
          </>
        ) : null}
      </div>
      <div className="form-row align-items-center">
        {props.enabledParameters.audio ? <FormAudio /> : null}
        {props.enabledParameters.audioCodecType ? <FormAudioCodecType /> : null}
        {props.enabledParameters.audioBitRate ? <FormAudioBitRate /> : null}
        {props.enabledParameters.autoGainControl ? <FormAutoGainControl /> : null}
        {props.enabledParameters.noiseSuppression ? <FormNoiseSuppression /> : null}
        {props.enabledParameters.echoCancellation ? <FormEchoCancellation /> : null}
        {props.enabledParameters.echoCancellationType ? <FormEchoCancellationType /> : null}
      </div>
      <div className="form-row align-items-center">
        {props.enabledParameters.video ? <FormVideo /> : null}
        {props.enabledParameters.videoCodecType ? <FormVideoCodecType /> : null}
        {props.enabledParameters.videoBitRate ? <FormVideoBitRate /> : null}
        {props.enabledParameters.resolution ? <FormResolution /> : null}
        {props.enabledParameters.frameRate ? <FormFrameRate /> : null}
        {props.enabledParameters.simulcastRid ? <FormSimulcastRid /> : null}
        {props.enabledParameters.spotlightFocusRid ? <FormSpotlightFocusRid /> : null}
        {props.enabledParameters.spotlightUnfocusRid ? <FormSpotlightUnfocusRid /> : null}
      </div>
      <div className="form-row align-items-center">
        {props.enabledParameters.audioInput ? <FormAudioInput /> : null}
        {props.enabledParameters.audioOutput ? <FormAudioOutput /> : null}
        {props.enabledParameters.videoInput ? <FormVideoInput /> : null}
        {props.enabledParameters.displayResolution ? <FormDisplayResolution /> : null}
      </div>
      <div className="form-row align-items-center py-1">
        {props.enabledParameters.micDevice ? <FormMicDevice /> : null}
        {props.enabledParameters.cameraDevice ? <FormCameraDevice /> : null}
        {props.enabledParameters.audioTrack ? <FormAudioTrack /> : null}
        {props.enabledParameters.videoTrack ? <FormVideoTrack /> : null}
      </div>
      <div className="form-row align-items-center">
        <ButtonConnect
          connectType={props.connectType}
          multistream={props.multistream ? true : false}
          spotlight={props.spotlight ? true : false}
          simulcast={props.simulcast ? true : false}
        />
        <ButtonDisconnect />
        <ButtonStartRecording />
        <ButtonStopRecording />
        {!props.spotlight && props.simulcast && props.connectType !== "sendonly" ? (
          <>
            <ButtonRequestRtpStream rid={"r0"} />
            <ButtonRequestRtpStream rid={"r1"} />
            <ButtonRequestRtpStream rid={"r2"} />
          </>
        ) : null}
        {props.spotlight && props.simulcast && props.connectType !== "sendonly" ? (
          <>
            <ButtonRequestRtpStream rid={"r0"} />
            <ButtonRequestRtpStream rid={"r1"} />
            <ButtonRequestRtpStream rid={"r2"} />
            <ButtonResetRtpStream />
          </>
        ) : null}
        <ReloadDevices />
      </div>
      <LocalVideo connectType={props.connectType} />
      {props.connectType === "recvonly" || props.connectType === "sendrecv" ? (
        <RemoteVideos
          multistream={props.multistream === true}
          simulcast={props.simulcast === true}
          spotlight={props.spotlight === true}
        />
      ) : null}
    </div>
  );
};

export default ColDemo;
