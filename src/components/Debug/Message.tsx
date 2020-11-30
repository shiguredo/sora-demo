import React, { useState } from "react";
import { Collapse } from "react-bootstrap";

import ButtonCopyLog from "@/components/Button/CopyLog";
import { formatUnixtime } from "@/utils";

type DescriptionProps = {
  description: string | number | Record<string, unknown>;
};
const Description: React.FC<DescriptionProps> = (props) => {
  const { description } = props;
  if (typeof description !== "object") {
    return (
      <div className="debug-message">
        <div className="pl-0 col-sm-12">
          <pre>{description}</pre>
        </div>
      </div>
    );
  }
  return (
    <>
      {Object.keys(description).map((key) => {
        const message = ((m) => {
          if (typeof m === "string") {
            return m;
          }
          return JSON.stringify(m, null, 2);
        })(description[key]);
        return (
          <div key={key} className="debug-message">
            <div className="pl-0 col-4 text-break">{key}:</div>
            <div className="col-8">
              <pre>{message}</pre>
            </div>
          </div>
        );
      })}
    </>
  );
};

type Props = {
  timestamp: number | null;
  title: string;
  description: string | number | Record<string, unknown>;
};
const Message: React.FC<Props> = (props) => {
  const { description, title, timestamp } = props;
  const [show, setShow] = useState(false);
  const ariaControls = timestamp ? title + timestamp : title;
  return (
    <div className="border border-light rounded my-2 bg-dark">
      <div className="d-flex justify-content-between align-items-center text-break">
        <a className="debug-title" onClick={() => setShow(!show)} aria-controls={ariaControls} aria-expanded={show}>
          <i className={show ? "arrow-bottom" : "arrow-right"} />{" "}
          {timestamp ? <span className="text-white-50 mr-1">[{formatUnixtime(timestamp)}]</span> : null}
          {title}
        </a>
        <div className="border-left">
          <ButtonCopyLog text={JSON.stringify(description, null, 2)} />
        </div>
      </div>
      <Collapse in={show}>
        <div className="border-top pl-4 py-1">
          <Description description={description} />
        </div>
      </Collapse>
    </div>
  );
};

export default Message;