import React from 'react';
import './Other.css';

class Utilities {

    static formatVerseInTable(item, isActive) {
        return (
            <table className="my-selector-table">
                <tbody>
                <tr className={"my-selector-row " + (isActive ? 'my-active-verse' : '')}>
                    <td className={"ms-fontSize-s verse-num " + (isActive ? '' : 'ms-fontColor-themePrimary')}>{item.key}</td>
                    <td className={"verse-text"}>{item.text}</td>
                </tr>
                </tbody>
            </table>
        )        
    }
}

export default Utilities;