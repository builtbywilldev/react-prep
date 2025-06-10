import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="user-list">
          {loading ? (
            new Array(4).fill(0).map((_, index) => (
              <div className="user" key={index}>
                <div className="user-card">
                  <div className="user-card__container">
                    <h3 className="post__title--skeleton" style={{ width: '120px' }}></h3>
                    <p className="post__body--skeleton" style={{ height: '12px', marginBottom: '10px' }}></p>
                    <p className="post__body--skeleton" style={{ height: '12px', marginBottom: '10px' }}></p>
                    <p className="post__body--skeleton" style={{ height: '12px' }}></p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            users.map((user) => (
              <div className="user" key={user.id}>
                <div className="user-card">
                  <div className="user-card__container">
                    <h3>{user.name}</h3>
                    <p>
                      <b>Email:</b> {user.email}
                    </p>
                    <p>
                      <b>Phone:</b> {user.phone}
                    </p>
                    <p>
                      <b>Website:</b> {user.website}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
