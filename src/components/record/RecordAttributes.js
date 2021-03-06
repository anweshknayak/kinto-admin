/* @flow */
import type {
  Capabilities,
  SessionState,
  BucketState,
  CollectionState,
  RecordState,
  RecordData,
  RecordRouteMatch,
} from "../../types";

import React, { PureComponent } from "react";

import RecordForm from "./RecordForm";
import RecordTabs from "./RecordTabs";

type Props = {
  match: RecordRouteMatch,
  session: SessionState,
  capabilities: Capabilities,
  bucket: BucketState,
  collection: CollectionState,
  record: RecordState,
  deleteRecord: (bid: string, cid: string, rid: string) => void,
  deleteAttachment: (bid: string, cid: string, rid: string) => void,
  updateRecord: (
    bid: string,
    cid: string,
    rid: string,
    data: RecordData,
    attachment: ?string
  ) => void,
};

export default class RecordAttributes extends PureComponent<Props> {
  onSubmit = ({ __attachment__: attachment, ...record }: Object) => {
    const { match, updateRecord } = this.props;
    const {
      params: { bid, cid, rid },
    } = match;
    updateRecord(bid, cid, rid, { data: record }, attachment);
  };

  render() {
    const {
      match,
      session,
      capabilities,
      bucket,
      collection,
      record,
      deleteRecord,
      deleteAttachment,
    } = this.props;
    const {
      params: { bid, cid, rid },
    } = match;

    return (
      <div>
        <h1>
          Edit{" "}
          <b>
            {bid}/{cid}/{rid}
          </b>{" "}
          record attributes
        </h1>
        <RecordTabs
          bid={bid}
          cid={cid}
          rid={rid}
          selected="attributes"
          capabilities={capabilities}>
          <RecordForm
            bid={bid}
            cid={cid}
            rid={rid}
            session={session}
            bucket={bucket}
            collection={collection}
            record={record}
            deleteRecord={deleteRecord}
            deleteAttachment={deleteAttachment}
            onSubmit={this.onSubmit}
            capabilities={capabilities}
          />
        </RecordTabs>
      </div>
    );
  }
}
