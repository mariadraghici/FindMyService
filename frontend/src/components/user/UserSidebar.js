import React from 'react';
import './user-sidebar.css';

const UserSidebar = () => {

    return (
        <nav id="sidebarMenu" className="collapse d-lg-block user-sidebar collapse bg-white">
            <div className="position-sticky">
                <div className="list-group list-group-flush mx-3 mt-4">
                    <a
                    href="/dashboard"
                    className="list-group-item list-group-item-action py-2 ripple "
                    aria-current="true"
                    >
                    My profile
                    </a>
                    <a href="/dashboard" className="list-group-item list-group-item-action py-2 ripple">
                    My cars
                    </a>
                    <a href="#" className="list-group-item list-group-item-action py-2 ripple">
                    <span>Feedback</span>
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default UserSidebar;
