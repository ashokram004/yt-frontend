import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function App() {
  const VIDEO_IDS = [
    "vVDp1ulBKIk",
    "l2vB4qovRoE"
  ];

  const [videoData, setVideoData] = useState({});
  const [activeTab, setActiveTab] = useState(VIDEO_IDS[0]); // default is first video

  useEffect(() => {
    const loadStats = async () => {
      let result = {};

      for (const videoId of VIDEO_IDS) {
        const q = query(
          collection(db, "videos", videoId, "stats"),
          orderBy("timestamp", "desc")
        );

        const snapshot = await getDocs(q);
        const records = snapshot.docs.map(doc => doc.data());

        if (records.length > 0) {
          result[videoId] = {
            title: records[0].title,
            stats: records
          };
        }
      }

      setVideoData(result);
    };

    loadStats();
  }, []);

  const activeVideo = videoData[activeTab];

  return (
    <div className="app-container">

      {/* --- Modern Tabs --- */}
      <div className="tabs-container">
        {VIDEO_IDS.map(videoId => (
          <div
            key={videoId}
            className={`tab-item ${activeTab === videoId ? "active" : ""}`}
            onClick={() => setActiveTab(videoId)}
          >
            {videoData[videoId]?.title || videoId}
          </div>
        ))}
      </div>

      {/* --- Active Video Card --- */}
      {activeVideo && (
        <div className="card">
          <div className="title">{activeVideo.title}</div>

          <div className="table-container">
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Timestamp (IST)</th>
                  <th>Views</th>
                  <th>Likes</th>
                  <th>Comments</th>
                </tr>
              </thead>

              <tbody>
                {activeVideo.stats.map((s, idx) => (
                  <tr key={idx}>
                    <td>{s.timestamp}</td>

                    <td>
                      <span className="badge views">
                        {s.views.toLocaleString()}
                      </span>
                    </td>

                    <td>
                      <span className="badge likes">
                        {s.likes.toLocaleString()}
                      </span>
                    </td>

                    <td>
                      <span className="badge comments">
                        {s.comments.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
