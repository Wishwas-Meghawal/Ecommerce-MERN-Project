import React, { useState } from 'react';
import { FiChevronDown } from "react-icons/fi";

function Badge(props) {
  return (
    <span className={`inline-block  py-2 px-4 capitalize  rounded-full text-[11px] ${props.status=="pending" && 'bg-primary text-white'}
    ${props.status=="confirm" && 'bg-green-500 text-white'}
    ${props.status=="delivered" && 'bg-green-700 text-white'}`}>
        {
            props.status
        }
    </span>
  );
}

export default Badge;