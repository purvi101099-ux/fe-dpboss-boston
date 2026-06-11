import CommonButton from "@/components/common/commonButton";
import { BidEntry } from "./types";
import { DeleteOutlined } from "@ant-design/icons";

interface Props {
  bids: BidEntry[];
  onDelete: (id: number) => void;
}

const BidsTable: React.FC<Props> = ({ bids, onDelete }) => {
  const totalPoints = bids.reduce((total, bid) => total + bid.bid_point, 0);

  return (
    <>
      <div className="bid-table-wrapper">
        <table className="bid-table">
          <thead>
            <tr>
              <th>Bid No</th>
              <th>Game</th>
              <th>Bid</th>
              <th>Digit</th>
              <th>Point</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bids.length === 0 ? (
              <tr>
                <td colSpan={6}>Add your first bid!</td>
              </tr>
            ) : (
              bids.map((bid, index) => (
                <tr key={bid.id}>
                  <td>{index + 1}</td>
                  <td>{bid.bid_game_name}</td>
                  <td>{bid.bid_session}</td>
                  <td>{bid.bid_digit}</td>
                  <td>{bid.bid_point}</td>
                  <td><CommonButton label="" icon={<DeleteOutlined />} onClick={() => onDelete(bid.id)} style={{ background:"none",border:"none",color:"red",fontSize:"18px" }} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {bids.length > 0 && (
        <>
          <div className="bid-total-row">
            <span>Total Bids: {bids.length}</span>
            <span>Total Points: {totalPoints}</span>
          </div>

          <CommonButton htmlType="submit" label="Place All Bids" className="submit-all-btn"  style={{width:"100%"}}/>
        </>
      )}
    </>
  );
};

export default BidsTable;
