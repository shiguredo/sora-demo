import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import DebugLogMessages from "@/components/Debug/LogMessages";
import DebugNotifyMessages from "@/components/Debug/NotifyMessages";
import DebugPushMessages from "@/components/Debug/PushMessages";
import DebugSignalingMessages from "@/components/Debug/SignalingMessages";
import DebugStats from "@/components/Debug/Stats";
import DebugTimelineMessages from "@/components/Debug/TimelineMessages";
import { setDebugType, SoraDemoState } from "@/slice";

const ColDebug: React.FC = () => {
  const { debug, debugType } = useSelector((state: SoraDemoState) => state);
  const dispatch = useDispatch();
  if (!debug) {
    return null;
  }
  const onSelect = (key: string | null): void => {
    if (key === "log" || key === "notify" || key === "push" || key === "stats" || key === "datachannel") {
      dispatch(setDebugType(key));
    }
  };
  return (
    <div className="col-debug col-6">
      <Tabs id="debug-tab" defaultActiveKey={debugType} onSelect={onSelect}>
        <Tab eventKey="log" title="Log">
          <DebugLogMessages />
        </Tab>
        <Tab eventKey="signaling" title="Signaling">
          <DebugSignalingMessages />
        </Tab>
        <Tab eventKey="notify" title="Notfiy">
          <DebugNotifyMessages />
        </Tab>
        <Tab eventKey="push" title="Push">
          <DebugPushMessages />
        </Tab>
        <Tab eventKey="stats" title="Stats">
          <DebugStats />
        </Tab>
        <Tab eventKey="timeline" title="Timeline">
          <DebugTimelineMessages />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ColDebug;
