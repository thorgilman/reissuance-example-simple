import {useState} from 'react';
import React from 'react';
import urls from "../services/urls";
import http from "../services/http";
import '../styling/Button.scss';
import '../styling/Cordapps.css';
import {SHOW_CORDAPPS, HIDE_CORDAPPS} from "../services/buttons";


function Cordapps() {
    const [nodeDiagnostics, setNodeDiagnostics] = useState([])
    const [cordapps, setCordapps] = useState([])
    const [buttonText, setButtonText] = useState(SHOW_CORDAPPS)
    const [shouldDisplayTable, setDisplayTable] = useState(false)
    const changeText = (text) => {
        setButtonText(text)
        setDisplayTable(!shouldDisplayTable)
    }
    const getButtonText = () => shouldDisplayTable ? SHOW_CORDAPPS : HIDE_CORDAPPS

    function listCordapps() {
        console.log("Getting flows");
        http.get(urls.get_cordapps)
            .then(r => {
                if (r.status === 200 && r.data.status === true) {
                    console.log("flows:" + r.data.data)
                    setCordapps(r.data.data.cordapps)
                    setNodeDiagnostics(r.data.data)
                } else {
                }
            });
    }

    return (
        <div>
            {/*eslint-disable-next-line*/}
            <a type="button"
               className="btn btn-2"
               onClick={() => {
                   listCordapps();
                   changeText(getButtonText())
               }}>{buttonText}</a>
            {shouldDisplayTable &&
            <div className="cordapps">

                <div style={{color: "white", paddingTop: "20px"}}><span className="b">Corda Version: </span> {nodeDiagnostics.version}</div>
                <table className="pa4">
                    <tbody>
                    {cordapps.map((cordapp, index) => {
                        return <tr>
                            <div key={index} className="cordapp-wrapper">
                                <div className="app-info" style={{
                                    marginRight: index % 2 === 0 ? 5 : 0,
                                    marginLeft: index % 2 === 0 ? 0 : 5
                                }}>
                                    <div className="b">{cordapp.shortName}</div>
                                    <div><span>Version: </span> {cordapp.version}</div>
                                    <div><span>Type: </span> {cordapp.type}</div>
                                    <div><span>Minimum Platform Version: </span> {cordapp.minimumPlatformVersion}</div>
                                    <div><span>Target Platform Version: </span> {cordapp.targetPlatformVersion}</div>
                                    <div><span>File: </span> {cordapp.name}.jar</div>
                                    <div><span>Vendor: </span> {cordapp.vendor}</div>
                                    <div><span>License: </span> {cordapp.licence}</div>
                                </div>
                            </div>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
}

export default Cordapps;