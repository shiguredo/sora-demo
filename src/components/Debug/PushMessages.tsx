import React from "react";
import { useSelector } from "react-redux";

import Message from "@/components/Debug/Message";
import { SoraDemoState } from "@/slice";
import { PushMessage } from "@/utils";

const SIGNALING_COLORS: { [key: string]: string } = {
  websocket: "#00ff00",
  datachannel: "#ff00ff",
};

const Label: React.FC<{ text: string }> = (props) => {
  const { text } = props;
  const color = Object.keys(SIGNALING_COLORS).includes(text) ? SIGNALING_COLORS[text] : undefined;
  return <span style={color ? { color: color } : {}}>[{text}]</span>;
};

type CollapsePushProps = {
  push: PushMessage;
  ariaControls: string;
};
const Collapse: React.FC<CollapsePushProps> = (props) => {
  const { push } = props;
  const label = push.transportType ? <Label text={push.transportType} /> : null;
  return <Message title={push.message.type} timestamp={push.timestamp} description={push.message} label={label} />;
};

const Log = React.memo((props: CollapsePushProps) => {
  return <Collapse {...props} />;
});

const PushMessages: React.FC = () => {
  const { pushMessages } = useSelector((state: SoraDemoState) => state);
  return (
    <>
      {pushMessages.map((pushMessage, index) => {
        const key = `${pushMessage.timestamp}-${index}`;
        return <Log key={key} ariaControls={key} push={pushMessage} />;
      })}
    </>
  );
};

export default PushMessages;
