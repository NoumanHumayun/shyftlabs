import {
  PersonAddAlt,
  Home,
  LibraryBooksOutlined,
  PersonOutline,
  MenuBookOutlined,
  CollectionsBookmarkOutlined,
  BookOutlined,
} from "@mui/icons-material";
import "./Sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h2 className="sidebarTitle">Dashboard</h2>
          <ul className="sidebarList">
            <li className="sidebarListItem active">
              <Link className="siderListLink" to="/">
                <Home className="listItemIcon" /> Home
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h2 className="sidebarTitle">Students</h2>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <Link className="siderListLink" to="/students">
                <PersonOutline className="listItemIcon" /> View
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link className="siderListLink" to="/students/add">
                <PersonAddAlt className="listItemIcon" /> Add
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h2 className="sidebarTitle">Courses</h2>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <Link className="siderListLink" to="/courses">
                <LibraryBooksOutlined className="listItemIcon" /> View
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link className="siderListLink" to="/courses/add">
                <MenuBookOutlined className="listItemIcon" /> Add
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h2 className="sidebarTitle">Results</h2>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <Link className="siderListLink" to="/results">
                <CollectionsBookmarkOutlined className="listItemIcon" /> View
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link className="siderListLink" to="/results/add">
                <BookOutlined className="listItemIcon" /> Add
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
