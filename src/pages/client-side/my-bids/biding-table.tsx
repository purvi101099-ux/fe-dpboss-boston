interface BidEntry {
  id: number;
  bidType: string;
  digits: string;
  points: number;
}

interface Props {
  bids: BidEntry[];
  onDelete: (id: number) => void;
}

const BidsTable: React.FC<Props> = ({ bids, onDelete }) => {
  const totalPoints = bids.reduce((total, bid) => total + bid.points, 0);

  return (
    <>
      <div className="bid-table-wrapper">
        <table className="bid-table">
          <thead>
            <tr>
              <th>Bid No</th>
              <th>Bid Type</th>
              <th>Digits</th>
              <th>Points</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bids.length === 0 ? (
              <tr>
                <td colSpan={5}>No bids added yet</td>
              </tr>
            ) : (
              bids.map((bid, index) => (
                <tr key={bid.id}>
                  <td>{index + 1}</td>
                  <td>{bid.bidType}</td>
                  <td>{bid.digits}</td>
                  <td>{bid.points}</td>
                  <td>
                    <button
                      type="button"
                      className="bid-delete-btn"
                      onClick={() => onDelete(bid.id)}
                    >
                      Delete
                    </button>
                  </td>
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

          <button type="button" className="submit-all-btn">
            Submit All Bids
          </button>
        </>
      )}
    </>
  );
};

export default BidsTable;
