import React from "react";
import styled from "styled-components";
import BlueCircle from "../../assets/icons/sela-circle-blue.svg";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUsers, approve, revoke } from "../../store/action-creators/admin";
import moment from "moment";
import admin from "../../store/actions/admin";
import Icon from "react-fa";

const blue = "#156EDC";

const ADW = styled.div`
  .white {
    background: white;
  }

  #list {
    height: 100vh;
    overflow: auto;

    nav {
      margin-top: 3.75em;
      list-style-type: none;
      height: auto;
      li {
        font-weight: 300;
        padding: 1.5em 0;
        text-align: left !important;
      }
    }

    ul {
      padding: 1em 0;

      li {
        padding: 0.5em 0;

        > div {
          font-weight: 300;
        }
      }
    }
  }

  .gray {
    background: #f9fafc;
  }

  @media (min-width: 768px) {
    .tabs-bg {
      display: block;
    }

    .tabs-sm {
      display: none;
    }
  }
  @media (max-width: 767px) {
    .tabs-sm {
      display: block;
      margin-bottom: 1em;
    }

    .tabs-bg {
      display: none;
    }
  }

  select#small-screen,
  #search {
    color: #666;
    font-weight: 300;
    font-size: 14px;
  }

  select#small-screen {
    width: 100%;
    height: 40px;
    background: white;
    margin: 10px 0;
    border: 1px solid #ddd;
  }

  #search {
    background: #ffffff;
    border: 1px solid #e0e1e2;
    box-sizing: border-box;
    border-radius: 4px;
    height: 40px;
    text-indent: 1em;
    position: relative;
  }

  nav {
    height: 80px;
    img {
      height: 40px;
      width: 40px;
      object-fit: contain;
    }
    h3 {
      line-height: normal;
      font-size: 20px;
      letter-spacing: 0.02em;
      color: #22292f;
      margin: 0;
      font-weight: 300;
    }

    border-bottom: 2px solid rgba(135, 149, 161, 0.1);
  }

  h2#fa {
    line-height: normal;
    font-size: 24px;
    letter-spacing: 0.02em;
    font-weight: 300;
    color: #000000;

    padding: 1.5em 0;
  }

  .tabs-bg {
    a {
      display: inline-block;
      height: 60px;
      line-height: 40px;
      
      font-size: 15.5px;
      background: transparent;
      text-align: left;
      border: 0;
      width: 100%;
      font-weight: 300;
      letter-spacing: 0.02em;
      color: #8795a1;

      &.active {
        color: ${blue};
        border-bottom: 2px solid #156edc;
      }
    }
  }

  span {
    &.activated,
    &.pending,
    &.revoked {
      display: inline-block;
      margin: 0px 4px;
      height: 8px;
      width: 8px;
      border-radius: 8px;
    }

    &.activated {
      background: lightgreen;
    }

    &.pending {
      background: orange;
    }
    &.revoked {
      background: pink;
    }
  }

  .loading {
    height: 30px;
    font-weight: 300;
    width: 60px;
    color: white;
    border-radius: 5px;
    background: silver;
    padding: 0 0.5em;
    border: 0;
    cursor: not-allowed;
  }

  #activate {
    height: 30px;
    font-weight: 300;
    color: white;
    border-radius: 5px;
    background: lightgreen;
    padding: 0 0.5em;
    border: 0;
  }

  #revoke {
    height: 30px;
    font-weight: 300;
    color: white;
    border-radius: 5px;
    background: pink;
    padding: 0 0.5em;
    border: 0;
  }

  #activate,
  #revoke {
    margin: 4px;
    font-size: 13px;
  }
`;

const Status = ({ value }) => {
  switch (value) {
    case "approved":
      return (
        <React.Fragment>
          <span className="activated" />
          <span>Approved</span>
        </React.Fragment>
      );

    case "revoked":
      return (
        <React.Fragment>
          <span className="revoked" />
          <span>Denied</span>
        </React.Fragment>
      );

    default:
      return (
        <React.Fragment>
          <span className="pending" />
          <span>Pending</span>
        </React.Fragment>
      );
  }
};

const ControlButton = ({ type, userId, id, value, revoke, approve }) => {
  let handleRevoke = () => revoke(id),
    handleApprove = () => approve(id);

  if (type === admin.APPROVE_R || type === admin.REVOKE_R) {
    if (userId === id) {
      return (
        <button className="loading" disabled>
          <Icon name="spinner" spin />
        </button>
      );
    }
  }

  switch (value) {
    case "pending":
      return (
        <button id="activate" onClick={handleApprove}>
          Approve
        </button>
      );

    case "revoked":
      return (
        <button id="activate" onClick={handleApprove}>
          Approve
        </button>
      );
    default:
      return (
        <button id="revoke" onClick={handleRevoke}>
          Revoke
        </button>
      );
  }
};

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchUsers();
    this.state = {
      users: this.props.users
    };
  }

  handleSelect = e => {
    const { value } = e.target;
    return this.props.history.push(`/admin/users/${value}`);
  };

  handleSearch = e => {
    const { value } = e.target;
    this.setState({
      searchValue: value
    });
  };

  approve = id => this.props.approve(id);

  revoke = id => this.props.revoke(id);

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        users: nextProps.users.map(u => {
          if (u._id === nextProps.userId) {
            if (Boolean(nextProps.userActivationResponse)) {
              u.activation = nextProps.userActivationResponse;
            }
          }
          return u;
        })
      });
    }
  }
  render() {
    let { users } = this.props,
      route = this.props.match.params.route;

    let { searchValue } = this.state;

    users = users.filter(u => {
      if (route === "view-all") return u;
      return u.activation === route;
    });

    if (Boolean(searchValue)) {
      users = users.filter(u => {
        return (
          u.firstName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ||
          u.lastName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
        );
      });
    }

    return (
      <ADW className="xs-12">
        <nav className="xs-12 white">
          <div className="xs-3 t-c i-h">
            <div className="c-w i-h ">
              <div className="c i-h">
                <img src={BlueCircle} alt="blue-circle" />
              </div>
            </div>
          </div>
          <div className="xs-9 i-h">
            <div className="c-w i-h ">
              <div className="c i-h">
                <h3>Internal Dashboard</h3>
              </div>
            </div>
          </div>
        </nav>

        <section className="xs-12 white">
          <div className="xs-10 xs-off-1">
            <h2 id="fa">Funder Approvals </h2>

            <div className="tabs-sm xs-12">
              <select
                id="small-screen"
                className="xs-12"
                onChange={this.handleSelect}
              >
                <option value="pending"> Pending Approvals </option>
                <option value="approved"> Approved Users </option>
                <option value="revoked"> Denied Users </option>
                <option value="view-all"> View All Users </option>
              </select>

              <div className="xs-12">
                <form className="xs-12">
                  <input
                    name="search"
                    id="search"
                    className="xs-12"
                    placeholder="Search for a user"
                    onChange={this.handleSearch}
                  />
                </form>
              </div>
            </div>
            <div className="tabs-bg xs-12">
              <div className="xs-9">
                <div className="xs-3">
                  <NavLink
                    to="/admin/users/pending"
                    activeClassName="active"
                    onClick={() => this.forceUpdate()}
                  >
                    Pending Approvals
                  </NavLink>
                </div>
                <div className="xs-3">
                  <NavLink
                    to="/admin/users/approved"
                    activeClassName="active"
                    onClick={() => this.forceUpdate()}
                  >
                    Approved Users
                  </NavLink>
                </div>
                <div className="xs-3">
                  <NavLink
                    to="/admin/users/revoked"
                    activeClassName="active"
                    onClick={() => this.forceUpdate()}
                  >
                    Denied Users
                  </NavLink>
                </div>
                <div className="xs-3">
                  <NavLink
                    to="/admin/users/view-all"
                    activeClassName="active"
                    onClick={() => this.forceUpdate()}
                  >
                    View All Sign Ups
                  </NavLink>
                </div>
              </div>

              <div className="xs-3">
                <form className="xs-12">
                  <input
                    name="search"
                    id="search"
                    className="xs-12"
                    placeholder="Search for a user"
                    onChange={this.handleSearch}
                  />
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="xs-12 gray" id="list">
          <div className="xs-10 xs-off-1">
            <nav className="xs-12">
              <li className="xs-2">Date</li>
              <li className="xs-3">Name</li>
              <li className="xs-3">Email Address</li>
              <li className="xs-2">Status</li>
              <li className="xs-2">Actions</li>
            </nav>
            <ul className="xs-12">
              {Boolean(users.length) ? (
                users.map((u, i) => {
                  return (
                    <li className="xs-12" key={i}>
                      <div className="xs-2">
                        {moment(u.createdOn).format("YYYY-MM-DD")}
                      </div>
                      <div className="xs-3">{`${u.lastName} ${
                        u.firstName
                      }`}</div>
                      <div className="xs-3">{u.email}</div>
                      <div className="xs-2">
                        {" "}
                        <Status
                          value={u.activation}
                          id={u._id}
                          {...this.props}
                        />
                      </div>
                      <div className="xs-2">
                        <ControlButton
                          id={u._id}
                          value={u.activation}
                          {...this.props}
                        />
                      </div>
                    </li>
                  );
                })
              ) : (
                <p>No Users Found.</p>
              )}
            </ul>
          </div>
        </section>
      </ADW>
    );
  }
}
const mapStateToProps = state => {
  return {
    users: state.admin.users,
    type: state.admin.type,
    userId: state.admin.user.id,
    userActivationResponse: state.admin.user.userActivationResponse
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    approve: id => dispatch(approve(id)),
    revoke: id => dispatch(revoke(id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminDashboard)
);
