import React from "react";

const Path = (props) => (
    <path
        fill="transparent"
        strokeWidth="3"
        stroke="#fafafa"
        strokeLinecap="round"
        {...props}
    />
);

export const MenuToggle = ({ toggle, isOpen }) => (
    <button onClick={toggle} className="outline-none border-none cursor-pointer w-10 h-10 rounded-full flex justify-center items-center relative bg-slate-900 ">
        <svg width="20" height="20" viewBox="0 0 23 18" className={`${isOpen ? 'ml-[2.95px]' : 'm-0'}`}>
            <Path
                d="M 2 2.5 L 20 2.5"
                className="top"
                variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" }
                }}
            />
            <Path d="M 2 9.423 L 20 9.423" opacity="1" className="middle" />
            <Path
                d="M 2 16.346 L 20 16.346"
                className="bottom"
                variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" }
                }}
            />
        </svg>
    </button>
);
