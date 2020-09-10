import { ActionCreatorWithPayload, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import Sora, { ConnectionOptions, ConnectionPublisher, ConnectionSubscriber } from "sora-js-sdk";

import {
  AUDIO_BIT_RATES,
  AUDIO_CODEC_TYPES,
  ECHO_CANCELLATION_TYPES,
  FRAME_RATES,
  RESOLUTIONS,
  SIMULCAST_QUARITY,
  SPOTLIGHT_NUMBERS,
  SPOTLIGHTS,
  VIDEO_BIT_RATES,
  VIDEO_CODEC_TYPES,
  WORKER_SCRIPT,
} from "@/constants";
import {
  createAudioConstraints,
  createFakeMediaConstraints,
  createFakeMediaStream,
  createSignalingURL,
  createVideoConstraints,
  DebugType,
  drawFakeCanvas,
  LogMessage,
  NotifyMessage,
  parseQueryString,
  parseSpotlight,
  SoraDemoMediaDevices,
  SoraNotifyMessage,
} from "@/utils";

export type SoraDemoState = {
  audio: boolean;
  audioBitRate: typeof AUDIO_BIT_RATES[number];
  audioCodecType: typeof AUDIO_CODEC_TYPES[number];
  audioInput: string;
  audioInputDevices: MediaDeviceInfo[];
  audioOutput: string;
  audioOutputDevices: MediaDeviceInfo[];
  autoGainControl: boolean;
  channelId: string;
  googCpuOveruseDetection: boolean | null;
  debug: boolean;
  debugType: DebugType;
  echoCancellation: boolean;
  echoCancellationType: typeof ECHO_CANCELLATION_TYPES[number];
  enabledCamera: boolean;
  enabledMic: boolean;
  errorMessage: string | null;
  fake: boolean;
  fakeContents: {
    worker: Worker | null;
    colorCode: number;
    gainNode: GainNode | null;
  };
  fakeVolume: string;
  frameRate: typeof FRAME_RATES[number];
  getDisplayMedia: boolean;
  immutable: {
    sora: ConnectionPublisher | ConnectionSubscriber | null;
    localMediaStream: MediaStream | null;
    remoteMediaStreams: MediaStream[];
  };
  logMessages: LogMessage[];
  mute: boolean;
  noiseSuppression: boolean;
  notifyMessages: NotifyMessage[];
  resolution: typeof RESOLUTIONS[number];
  simulcastQuality: typeof SIMULCAST_QUARITY[number];
  spotlightConnectionIds: {
    [key: string]: string;
  };
  spotlight: typeof SPOTLIGHTS[number];
  spotlightNumber: typeof SPOTLIGHT_NUMBERS[number];
  video: boolean;
  videoBitRate: typeof VIDEO_BIT_RATES[number];
  videoCodecType: typeof VIDEO_CODEC_TYPES[number];
  videoInput: string;
  videoInputDevices: MediaDeviceInfo[];
};

const initialState: SoraDemoState = {
  audio: true,
  audioBitRate: "",
  audioCodecType: "",
  audioInput: "",
  audioInputDevices: [],
  audioOutput: "",
  audioOutputDevices: [],
  autoGainControl: true,
  channelId: "sora",
  googCpuOveruseDetection: null,
  debug: false,
  debugType: "log",
  echoCancellation: true,
  echoCancellationType: "",
  enabledCamera: false,
  enabledMic: false,
  errorMessage: null,
  fake: false,
  fakeVolume: "0",
  fakeContents: {
    worker: null,
    colorCode: 0,
    gainNode: null,
  },
  frameRate: "",
  getDisplayMedia: false,
  immutable: {
    sora: null,
    localMediaStream: null,
    remoteMediaStreams: [],
  },
  logMessages: [],
  mute: false,
  noiseSuppression: true,
  notifyMessages: [],
  resolution: "",
  simulcastQuality: "",
  spotlight: "2",
  spotlightNumber: "",
  spotlightConnectionIds: {},
  video: true,
  videoBitRate: "",
  videoCodecType: "",
  videoInput: "",
  videoInputDevices: [],
};

const slice = createSlice({
  name: "soraDemo",
  initialState,
  reducers: {
    resetState: (state) => {
      Object.assign(state, initialState);
    },
    setAudio: (state, action: PayloadAction<boolean>) => {
      state.audio = action.payload;
    },
    setAudioInput: (state, action: PayloadAction<string>) => {
      state.audioInput = action.payload;
    },
    setAudioOutput: (state, action: PayloadAction<string>) => {
      state.audioOutput = action.payload;
    },
    setAudioBitRate: (state, action: PayloadAction<typeof AUDIO_BIT_RATES[number]>) => {
      state.audioBitRate = action.payload;
    },
    setAudioCodecType: (state, action: PayloadAction<typeof AUDIO_CODEC_TYPES[number]>) => {
      state.audioCodecType = action.payload;
    },
    setAutoGainControl: (state, action: PayloadAction<boolean>) => {
      state.autoGainControl = action.payload;
    },
    setChannelId: (state, action: PayloadAction<string>) => {
      state.channelId = action.payload;
    },
    setGoogCpuOveruseDetection: (state, action: PayloadAction<boolean>) => {
      state.googCpuOveruseDetection = action.payload;
    },
    setEchoCancellation: (state, action: PayloadAction<boolean>) => {
      state.echoCancellation = action.payload;
    },
    setEchoCancellationType: (state, action: PayloadAction<typeof ECHO_CANCELLATION_TYPES[number]>) => {
      state.echoCancellationType = action.payload;
    },
    setFake: (state, action: PayloadAction<boolean>) => {
      state.fake = action.payload;
    },
    setFakeVolume: (state, action: PayloadAction<string>) => {
      const volume = parseFloat(action.payload);
      if (isNaN(volume)) {
        state.fakeVolume = "0";
      } else if (1 < volume) {
        state.fakeVolume = "1";
      } else {
        state.fakeVolume = String(volume);
      }
      if (state.fakeContents.gainNode) {
        state.fakeContents.gainNode.gain.setValueAtTime(parseFloat(state.fakeVolume), 0);
      }
    },
    setFakeContentsGainNode: (state, action: PayloadAction<GainNode | null>) => {
      state.fakeContents.gainNode = action.payload;
    },
    setInitialFakeContents: (state) => {
      // Fake canvas の背景色で使う color code を生成
      state.fakeContents.colorCode = Math.floor(Math.random() * 0xffffff);
      // Fake canvas を表示しているブラウザタブがバックグラウンドへ移動しても canvas のレンダリングを続けるために worker を生成
      const url = URL.createObjectURL(new Blob([WORKER_SCRIPT], { type: "application/javascript" }));
      state.fakeContents.worker = new Worker(url);
    },
    setFrameRate: (state, action: PayloadAction<typeof FRAME_RATES[number]>) => {
      state.frameRate = action.payload;
    },
    setMute: (state, action: PayloadAction<boolean>) => {
      state.mute = action.payload;
    },
    setNoiseSuppression: (state, action: PayloadAction<boolean>) => {
      state.noiseSuppression = action.payload;
    },
    setGetDisplayMedia: (state, action: PayloadAction<boolean>) => {
      state.getDisplayMedia = action.payload;
    },
    setResolution: (state, action: PayloadAction<typeof RESOLUTIONS[number]>) => {
      state.resolution = action.payload;
    },
    setSimulcastQuality: (state, action: PayloadAction<typeof SIMULCAST_QUARITY[number]>) => {
      state.simulcastQuality = action.payload;
    },
    setSpotlight: (state, action: PayloadAction<typeof SPOTLIGHTS[number]>) => {
      state.spotlight = action.payload;
    },
    setSpotlightNumber: (state, action: PayloadAction<typeof SPOTLIGHT_NUMBERS[number]>) => {
      state.spotlightNumber = action.payload;
    },
    setVideo: (state, action: PayloadAction<boolean>) => {
      state.video = action.payload;
    },
    setVideoInput: (state, action: PayloadAction<string>) => {
      state.videoInput = action.payload;
    },
    setVideoBitRate: (state, action: PayloadAction<typeof VIDEO_BIT_RATES[number]>) => {
      state.videoBitRate = action.payload;
    },
    setVideoCodecType: (state, action: PayloadAction<typeof VIDEO_CODEC_TYPES[number]>) => {
      state.videoCodecType = action.payload;
    },
    setSora: (state, action: PayloadAction<ConnectionPublisher | ConnectionSubscriber | null>) => {
      // `Type instantiation is excessively deep and possibly infinite` エラーが出るので any に type casting する
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.immutable.sora = <any>action.payload;
    },
    setLocalMediaStream: (state, action: PayloadAction<MediaStream | null>) => {
      if (state.immutable.localMediaStream) {
        state.immutable.localMediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
      state.immutable.localMediaStream = action.payload;
      if (action.payload) {
        state.enabledMic = action.payload.getAudioTracks().some((track) => track.enabled);
        state.enabledCamera = action.payload.getVideoTracks().some((track) => track.enabled);
      } else {
        state.enabledMic = false;
        state.enabledCamera = false;
      }
    },
    setRemoteMediaStream: (state, action: PayloadAction<MediaStream>) => {
      state.immutable.remoteMediaStreams.push(action.payload);
    },
    removeRemoteMediaStream: (state, action: PayloadAction<string>) => {
      const remoteMediaStreams = state.immutable.remoteMediaStreams.filter((stream) => stream.id !== action.payload);
      state.immutable.remoteMediaStreams = remoteMediaStreams;
    },
    removeAllRemoteMediaStreams: (state) => {
      state.immutable.remoteMediaStreams = [];
    },
    toggleEnabledMic: (state) => {
      state.enabledMic = !state.enabledMic;
      if (state.immutable.localMediaStream) {
        state.immutable.localMediaStream.getAudioTracks().forEach((track) => {
          track.enabled = state.enabledMic;
        });
      }
    },
    toggleEnabledCamera: (state) => {
      state.enabledCamera = !state.enabledCamera;
      if (state.immutable.localMediaStream) {
        state.immutable.localMediaStream.getVideoTracks().forEach((track) => {
          track.enabled = state.enabledCamera;
        });
      }
    },
    setAudioInputDevices: (state, action: PayloadAction<MediaDeviceInfo[]>) => {
      state.audioInputDevices = action.payload;
    },
    setVideoInputDevices: (state, action: PayloadAction<MediaDeviceInfo[]>) => {
      state.videoInputDevices = action.payload;
    },
    setAudioOutputDevices: (state, action: PayloadAction<MediaDeviceInfo[]>) => {
      state.audioOutputDevices = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    setDebug: (state, action: PayloadAction<boolean>) => {
      state.debug = action.payload;
    },
    setDebugType: (state, action: PayloadAction<DebugType>) => {
      state.debugType = action.payload;
    },
    setLogMessages: (state, action: PayloadAction<LogMessage>) => {
      state.logMessages.push(action.payload);
    },
    setNotifyMessages: (state, action: PayloadAction<NotifyMessage>) => {
      state.notifyMessages.push(action.payload);
    },
    setSpotlightConnectionIds: (state, action: PayloadAction<{ spotlightId: string; connectionId: string }>) => {
      // Spotlight 有効時に streamID(spotligId) と映像の配信者ID(connectionId) のマッピングを保存
      const spotlightConnectionIds = Object.assign(state.spotlightConnectionIds, {
        [action.payload.spotlightId]: action.payload.connectionId,
      });
      state.spotlightConnectionIds = spotlightConnectionIds;
    },
  },
});

// State に応じて MediaStream インスタンスを生成する
// Fake の場合には volume control 用の GainNode も同時に生成する
async function createMediaStream(state: SoraDemoState): Promise<[MediaStream, GainNode | null]> {
  if (state.getDisplayMedia) {
    return [await (navigator.mediaDevices as SoraDemoMediaDevices).getDisplayMedia({ video: true }), null];
  }
  if (state.fake && state.fakeContents.worker) {
    const constraints = createFakeMediaConstraints({
      audio: state.audio,
      video: state.video,
      frameRate: state.frameRate,
      resolution: state.resolution,
      volume: state.fakeVolume,
    });
    const { canvas, stream, gainNode } = createFakeMediaStream(constraints);
    state.fakeContents.worker.onmessage = (event) => {
      const data = event.data;
      if (data.type !== "update") {
        return;
      }
      drawFakeCanvas(canvas, state.fakeContents.colorCode, constraints.fontSize, data.counter.toString());
    };
    state.fakeContents.worker.postMessage({ type: "start", interval: 1000 / constraints.frameRate });
    return [stream, gainNode];
  }
  const mediaStream = new MediaStream();
  const audioConstraints = createAudioConstraints({
    audio: state.audio,
    autoGainControl: state.autoGainControl,
    noiseSuppression: state.noiseSuppression,
    echoCancellation: state.echoCancellation,
    echoCancellationType: state.echoCancellationType,
    audioInput: state.audioInput,
  });
  if (audioConstraints) {
    const audioMediaStream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints });
    mediaStream.addTrack(audioMediaStream.getAudioTracks()[0]);
  }
  const videoConstraints = createVideoConstraints({
    video: state.video,
    frameRate: state.frameRate,
    resolution: state.resolution,
    videoInput: state.videoInput,
  });
  if (videoConstraints) {
    const videoMediaStream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints });
    mediaStream.addTrack(videoMediaStream.getVideoTracks()[0]);
  }
  return [mediaStream, null];
}

// Sora connection オブジェクトに callback をセットする
function setSoraCallbacks(
  dispatch: Dispatch,
  getState: () => SoraDemoState,
  sora: ConnectionPublisher | ConnectionSubscriber
): void {
  sora.on("log", (title: string, description: boolean | number | string | Record<string, unknown>) => {
    dispatch(
      slice.actions.setLogMessages({
        timestamp: new Date().getTime(),
        message: {
          title: title,
          description: JSON.stringify(description, null, 2),
        },
      })
    );
  });
  sora.on("notify", (message: SoraNotifyMessage) => {
    if (
      message.event_type === "spotlight.changed" &&
      typeof message.spotlight_id === "string" &&
      typeof message.connection_id === "string"
    ) {
      // Spotlight 有効時に stream と映像の配信者の connection_id のマッピングが送られてくるため表示用に保存
      dispatch(
        slice.actions.setSpotlightConnectionIds({
          spotlightId: message.spotlight_id,
          connectionId: message.connection_id,
        })
      );
    }
    dispatch(
      slice.actions.setNotifyMessages({
        timestamp: new Date().getTime(),
        message: message,
      })
    );
  });
  sora.on("track", (event: RTCTrackEvent) => {
    const { immutable } = getState();
    const mediaStream = immutable.remoteMediaStreams.find((stream) => stream.id === event.streams[0].id);
    if (!mediaStream) {
      dispatch(slice.actions.setRemoteMediaStream(event.streams[0]));
    }
  });
  sora.on("removetrack", (event: MediaStreamTrackEvent) => {
    const { immutable } = getState();
    const mediaStream = immutable.remoteMediaStreams.find((stream) => {
      if (event?.target) {
        return stream.id === (event.target as MediaStream).id;
      }
    });
    if (mediaStream) {
      dispatch(slice.actions.removeRemoteMediaStream((event.target as MediaStream).id));
    }
  });
  sora.on("disconnect", () => {
    const { fakeContents, immutable } = getState();
    const { localMediaStream, remoteMediaStreams } = immutable;

    if (localMediaStream) {
      localMediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    remoteMediaStreams.forEach((mediaStream) => {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    });
    if (fakeContents.worker) {
      fakeContents.worker.postMessage({ type: "stop" });
    }
    dispatch(slice.actions.setSora(null));
    dispatch(slice.actions.setLocalMediaStream(null));
    dispatch(slice.actions.removeAllRemoteMediaStreams());
  });
}

// Sora の connectOptions を生成する
function createConnectOptions(
  pickedState: Pick<
    SoraDemoState,
    | "audio"
    | "audioBitRate"
    | "audioCodecType"
    | "simulcastQuality"
    | "spotlight"
    | "spotlightNumber"
    | "video"
    | "videoBitRate"
    | "videoCodecType"
  >,
  multistream: boolean,
  spotlight: boolean,
  simulcast: boolean
): ConnectionOptions {
  const connectionOptions: ConnectionOptions = {
    audio: pickedState.audio,
    video: pickedState.video,
  };
  if (pickedState.audioCodecType) {
    connectionOptions.audioCodecType = pickedState.audioCodecType;
  }
  const parsedAudioBitRate = parseInt(pickedState.audioBitRate, 10);
  if (parsedAudioBitRate) {
    connectionOptions.audioBitRate = parsedAudioBitRate;
  }
  if (pickedState.videoCodecType) {
    connectionOptions.videoCodecType = pickedState.videoCodecType;
  }
  const parsedVideoBitRate = parseInt(pickedState.videoBitRate, 10);
  if (parsedVideoBitRate) {
    connectionOptions.videoBitRate = parsedVideoBitRate;
  }
  if (multistream) {
    connectionOptions.multistream = true;
  }
  // 新/旧 spotlight 互換性のため parsedSpotlight は boolean | number になる
  // parsedSpotlight が number の場合は旧 spotlight 扱いになる
  // parsedSpotlight が true の場合は新 spotlight 扱いになるので spotlightNumber をセットする
  const parsedSpotlight = parseSpotlight(pickedState.spotlight);
  if (spotlight && parsedSpotlight) {
    connectionOptions.spotlight = parsedSpotlight;
    const parsedSpotlightNumber = parseInt(pickedState.spotlightNumber);
    if (parsedSpotlight === true && parsedSpotlightNumber) {
      connectionOptions.spotlightNumber = parsedSpotlightNumber;
    }
  }
  if (simulcast) {
    connectionOptions.simulcast = true;
    if (pickedState.simulcastQuality) {
      connectionOptions.simulcastQuality = pickedState.simulcastQuality;
    }
  }
  return connectionOptions;
}

// Sora との配信のみ接続
type SendonlyOption = {
  multistream?: boolean;
  spotlight?: boolean;
  simulcast?: boolean;
};
export const sendonlyConnectSora = (options?: SendonlyOption) => async (
  dispatch: Dispatch,
  getState: () => SoraDemoState
): Promise<void> => {
  const state = getState();
  if (state.immutable.sora) {
    await state.immutable.sora.disconnect();
  }
  const [mediaStream, gainNode] = await createMediaStream(state).catch((error) => {
    dispatch(slice.actions.setErrorMessage(error.toString()));
    throw error;
  });
  const signalingURL = createSignalingURL();
  const connection = Sora.connection(signalingURL, state.debug);
  const connectionOptions = createConnectOptions(
    {
      audio: state.audio,
      audioBitRate: state.audioBitRate,
      audioCodecType: state.audioCodecType,
      simulcastQuality: "",
      spotlight: state.spotlight,
      spotlightNumber: state.spotlightNumber,
      video: state.video,
      videoBitRate: state.videoBitRate,
      videoCodecType: state.videoCodecType,
    },
    options?.multistream === true,
    options?.spotlight === true,
    options?.simulcast === true
  );
  const sora = connection.sendonly(state.channelId, null, connectionOptions);
  if (typeof state.googCpuOveruseDetection === "boolean") {
    sora.constraints = {
      optional: [{ googCpuOveruseDetection: state.googCpuOveruseDetection }],
    };
  }
  setSoraCallbacks(dispatch, getState, sora);
  try {
    await sora.connect(mediaStream);
  } catch (error) {
    mediaStream.getTracks().forEach((track) => {
      track.stop();
    });
    dispatch(slice.actions.setErrorMessage("Failed to connect Sora"));
    throw error;
  }
  dispatch(slice.actions.setSora(sora));
  dispatch(slice.actions.setLocalMediaStream(mediaStream));
  dispatch(slice.actions.setFakeContentsGainNode(gainNode));
  dispatch(slice.actions.setErrorMessage(null));
};

// Sora との視聴のみ接続
type RecvonlyOption = {
  multistream?: boolean;
  spotlight?: boolean;
  simulcast?: boolean;
};
export const recvonlyConnectSora = (options?: RecvonlyOption) => async (
  dispatch: Dispatch,
  getState: () => SoraDemoState
): Promise<void> => {
  const state = getState();
  if (state.immutable.sora) {
    await state.immutable.sora.disconnect();
  }
  const signalingURL = createSignalingURL();
  const connection = Sora.connection(signalingURL, state.debug);
  const connectionOptions = createConnectOptions(
    {
      audio: state.audio,
      audioBitRate: state.audioBitRate,
      audioCodecType: state.audioCodecType,
      simulcastQuality: state.simulcastQuality,
      spotlight: state.spotlight,
      spotlightNumber: state.spotlightNumber,
      video: state.video,
      videoBitRate: state.videoBitRate,
      videoCodecType: state.videoCodecType,
    },
    options?.multistream === true,
    options?.spotlight === true,
    options?.simulcast === true
  );
  const sora = connection.recvonly(state.channelId, null, connectionOptions);
  setSoraCallbacks(dispatch, getState, sora);
  try {
    await sora.connect();
  } catch (error) {
    dispatch(slice.actions.setErrorMessage("Failed to connect Sora"));
    throw error;
  }
  dispatch(slice.actions.setSora(sora));
  dispatch(slice.actions.setErrorMessage(null));
};

// Sora との配信/視聴接続
type SendrecvOption = {
  spotlight?: boolean;
  simulcast?: boolean;
};
export const sendrecvConnectSora = (options?: SendrecvOption) => async (
  dispatch: Dispatch,
  getState: () => SoraDemoState
): Promise<void> => {
  const state = getState();
  if (state.immutable.sora) {
    await state.immutable.sora.disconnect();
  }
  const [mediaStream, gainNode] = await createMediaStream(state).catch((error) => {
    dispatch(slice.actions.setErrorMessage(error.toString()));
    throw error;
  });
  const signalingURL = createSignalingURL();
  const connection = Sora.connection(signalingURL, state.debug);
  const connectionOptions = createConnectOptions(
    {
      audio: state.audio,
      audioBitRate: state.audioBitRate,
      audioCodecType: state.audioCodecType,
      simulcastQuality: state.simulcastQuality,
      spotlight: state.spotlight,
      spotlightNumber: state.spotlightNumber,
      video: state.video,
      videoBitRate: state.videoBitRate,
      videoCodecType: state.videoCodecType,
    },
    true,
    options?.spotlight === true,
    options?.simulcast === true
  );
  const sora = connection.sendrecv(state.channelId, null, connectionOptions);
  if (typeof state.googCpuOveruseDetection === "boolean") {
    sora.constraints = {
      optional: [{ googCpuOveruseDetection: state.googCpuOveruseDetection }],
    };
  }
  setSoraCallbacks(dispatch, getState, sora);
  try {
    await sora.connect(mediaStream);
  } catch (error) {
    mediaStream.getTracks().forEach((track) => {
      track.stop();
    });
    dispatch(slice.actions.setErrorMessage("Failed to connect Sora"));
    throw error;
  }
  dispatch(slice.actions.setSora(sora));
  dispatch(slice.actions.setLocalMediaStream(mediaStream));
  dispatch(slice.actions.setFakeContentsGainNode(gainNode));
  dispatch(slice.actions.setErrorMessage(null));
};

// Sora との切断処理
export const disconnectSora = () => async (_: Dispatch, getState: () => SoraDemoState): Promise<void> => {
  const { immutable } = getState();
  if (immutable.sora) {
    await immutable.sora.disconnect();
  }
};

// デバイス一覧を取得
export const setMediaDevices = () => async (dispatch: Dispatch, _getState: () => SoraDemoState): Promise<void> => {
  const deviceInfos = await navigator.mediaDevices.enumerateDevices();
  const audioInputDevices: MediaDeviceInfo[] = [];
  const videoInputDevices: MediaDeviceInfo[] = [];
  const audioOutputDevices: MediaDeviceInfo[] = [];
  deviceInfos.forEach((deviceInfo) => {
    if (deviceInfo.deviceId === "") {
      return;
    }
    if (deviceInfo.kind === "audioinput") {
      audioInputDevices.push(deviceInfo.toJSON());
    } else if (deviceInfo.kind === "audiooutput") {
      audioOutputDevices.push(deviceInfo.toJSON());
    } else if (deviceInfo.kind === "videoinput") {
      videoInputDevices.push(deviceInfo.toJSON());
    }
  });
  dispatch(slice.actions.setAudioInputDevices(audioInputDevices));
  dispatch(slice.actions.setVideoInputDevices(videoInputDevices));
  dispatch(slice.actions.setAudioOutputDevices(audioOutputDevices));
};

// デバイスの変更時などに Sora との接続を維持したまま MediaStream のみ更新
export const updateMediaStream = () => async (dispatch: Dispatch, getState: () => SoraDemoState): Promise<void> => {
  const state = getState();
  if (!state.immutable.sora) {
    return;
  }
  if (state.immutable.localMediaStream) {
    state.immutable.localMediaStream.getTracks().forEach((track) => {
      track.stop();
    });
  }
  const [mediaStream, gainNode] = await createMediaStream(state).catch((error) => {
    dispatch(slice.actions.setErrorMessage(error.toString()));
    throw error;
  });
  mediaStream.getTracks().forEach((track) => {
    if (!state.immutable.sora || !state.immutable.sora.pc) {
      return;
    }
    const sender = state.immutable.sora.pc.getSenders().find((s) => {
      if (!s.track) {
        return false;
      }
      return s.track.kind === track.kind;
    });
    if (sender) {
      sender.replaceTrack(track);
    }
  });
  dispatch(slice.actions.setLocalMediaStream(mediaStream));
  dispatch(slice.actions.setFakeContentsGainNode(gainNode));
};

// QueryString の値とページから渡されたパラメーターを適切に action に渡すためのメソッド
function setInitialState<T>(
  dispatch: Dispatch,
  action: ActionCreatorWithPayload<T, string>,
  pageValue: T | undefined,
  queryStringValue: T | undefined
): void {
  if (pageValue !== undefined) {
    dispatch(action(pageValue));
  }
  if (queryStringValue !== undefined) {
    dispatch(action(queryStringValue));
  }
}
// component レンダリング後に画面初期状態を更新
export const setInitialParameter = (pageInitialParameters: Partial<SoraDemoState>) => async (
  dispatch: Dispatch,
  _: () => SoraDemoState
): Promise<void> => {
  dispatch(slice.actions.resetState());
  const queryStringParameters = parseQueryString();
  setInitialState<SoraDemoState["audio"]>(
    dispatch,
    slice.actions.setAudio,
    pageInitialParameters.audio,
    queryStringParameters.audio
  );
  setInitialState<SoraDemoState["audioBitRate"]>(
    dispatch,
    slice.actions.setAudioBitRate,
    pageInitialParameters.audioBitRate,
    queryStringParameters.audioBitRate
  );
  setInitialState<SoraDemoState["audioCodecType"]>(
    dispatch,
    slice.actions.setAudioCodecType,
    pageInitialParameters.audioCodecType,
    queryStringParameters.audioCodecType
  );
  setInitialState<SoraDemoState["audioInput"]>(
    dispatch,
    slice.actions.setAudioInput,
    pageInitialParameters.audioInput,
    queryStringParameters.audioInput
  );
  setInitialState<SoraDemoState["audioOutput"]>(
    dispatch,
    slice.actions.setAudioOutput,
    pageInitialParameters.audioOutput,
    queryStringParameters.audioOutput
  );
  setInitialState<SoraDemoState["autoGainControl"]>(
    dispatch,
    slice.actions.setAutoGainControl,
    pageInitialParameters.autoGainControl,
    queryStringParameters.autoGainControl
  );
  setInitialState<SoraDemoState["channelId"]>(
    dispatch,
    slice.actions.setChannelId,
    pageInitialParameters.channelId,
    queryStringParameters.channelId
  );
  setInitialState<SoraDemoState["channelId"]>(
    dispatch,
    slice.actions.setChannelId,
    pageInitialParameters.channelId,
    queryStringParameters.channelId
  );
  setInitialState<SoraDemoState["echoCancellation"]>(
    dispatch,
    slice.actions.setEchoCancellation,
    pageInitialParameters.echoCancellation,
    queryStringParameters.echoCancellation
  );
  setInitialState<SoraDemoState["echoCancellationType"]>(
    dispatch,
    slice.actions.setEchoCancellationType,
    pageInitialParameters.echoCancellationType,
    queryStringParameters.echoCancellationType
  );
  setInitialState<SoraDemoState["getDisplayMedia"]>(
    dispatch,
    slice.actions.setGetDisplayMedia,
    pageInitialParameters.getDisplayMedia,
    queryStringParameters.getDisplayMedia
  );
  setInitialState<SoraDemoState["fake"]>(
    dispatch,
    slice.actions.setFake,
    pageInitialParameters.fake,
    queryStringParameters.fake
  );
  setInitialState<SoraDemoState["fakeVolume"]>(
    dispatch,
    slice.actions.setFakeVolume,
    pageInitialParameters.fakeVolume,
    queryStringParameters.fakeVolume
  );
  setInitialState<SoraDemoState["frameRate"]>(
    dispatch,
    slice.actions.setFrameRate,
    pageInitialParameters.frameRate,
    queryStringParameters.frameRate
  );
  setInitialState<SoraDemoState["noiseSuppression"]>(
    dispatch,
    slice.actions.setNoiseSuppression,
    pageInitialParameters.noiseSuppression,
    queryStringParameters.noiseSuppression
  );
  setInitialState<SoraDemoState["resolution"]>(
    dispatch,
    slice.actions.setResolution,
    pageInitialParameters.resolution,
    queryStringParameters.resolution
  );
  setInitialState<SoraDemoState["simulcastQuality"]>(
    dispatch,
    slice.actions.setSimulcastQuality,
    pageInitialParameters.simulcastQuality,
    queryStringParameters.simulcastQuality
  );
  setInitialState<SoraDemoState["spotlight"]>(
    dispatch,
    slice.actions.setSpotlight,
    pageInitialParameters.spotlight,
    queryStringParameters.spotlight
  );
  setInitialState<SoraDemoState["spotlightNumber"]>(
    dispatch,
    slice.actions.setSpotlightNumber,
    pageInitialParameters.spotlightNumber,
    queryStringParameters.spotlightNumber
  );
  setInitialState<SoraDemoState["video"]>(
    dispatch,
    slice.actions.setVideo,
    pageInitialParameters.video,
    queryStringParameters.video
  );
  setInitialState<SoraDemoState["videoBitRate"]>(
    dispatch,
    slice.actions.setVideoBitRate,
    pageInitialParameters.videoBitRate,
    queryStringParameters.videoBitRate
  );
  setInitialState<SoraDemoState["videoCodecType"]>(
    dispatch,
    slice.actions.setVideoCodecType,
    pageInitialParameters.videoCodecType,
    queryStringParameters.videoCodecType
  );
  setInitialState<SoraDemoState["videoInput"]>(
    dispatch,
    slice.actions.setVideoInput,
    pageInitialParameters.videoInput,
    queryStringParameters.videoInput
  );
  setInitialState<SoraDemoState["debug"]>(
    dispatch,
    slice.actions.setDebug,
    pageInitialParameters.debug,
    queryStringParameters.debug
  );
  setInitialState<SoraDemoState["mute"]>(
    dispatch,
    slice.actions.setMute,
    pageInitialParameters.mute,
    queryStringParameters.mute
  );
  // googCpuOveruseDetection は query string からのみ受け付ける
  if (queryStringParameters.googCpuOveruseDetection !== undefined) {
    dispatch(slice.actions.setGoogCpuOveruseDetection(queryStringParameters.googCpuOveruseDetection));
  }
  dispatch(slice.actions.setInitialFakeContents());
  dispatch(slice.actions.setErrorMessage(null));
};

export const {
  setAudio,
  setAudioBitRate,
  setAudioCodecType,
  setAudioInput,
  setAudioOutput,
  setAutoGainControl,
  setChannelId,
  setDebug,
  setDebugType,
  setEchoCancellation,
  setEchoCancellationType,
  setErrorMessage,
  setFake,
  setFakeVolume,
  setFrameRate,
  setGetDisplayMedia,
  setLocalMediaStream,
  setLogMessages,
  setNoiseSuppression,
  setNotifyMessages,
  setResolution,
  setSimulcastQuality,
  setSpotlight,
  setSpotlightNumber,
  setSora,
  setVideo,
  setVideoBitRate,
  setVideoCodecType,
  setVideoInput,
  toggleEnabledCamera,
  toggleEnabledMic,
} = slice.actions;

export default slice.reducer;
