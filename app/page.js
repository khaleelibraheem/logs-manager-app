"use client";

import React, { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const PhoneCallList = () => {
  const [connectedCalls, setConnectedCalls] = useState(0);
  const [totalCallsToday, setTotalCallsToday] = useState(0);
  const [strongCall, setStrongCall] = useState(0);
  const [showConnectedOptions, setShowConnectedOptions] = useState(false);
  const [showStrongOptions, setShowStrongOptions] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isStrongCall, setIsStrongCall] = useState(false);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    const storedTotalCallsToday = localStorage.getItem("totalCallsToday");
    const storedConnectedCalls = localStorage.getItem("connectedCalls");
    const storedStrongCall = localStorage.getItem("strongCall");

    if (storedTotalCallsToday !== null) {
      setTotalCallsToday(parseInt(storedTotalCallsToday));
    }
    if (storedConnectedCalls !== null) {
      setConnectedCalls(parseInt(storedConnectedCalls));
    }
    if (storedStrongCall !== null) {
      setStrongCall(parseInt(storedStrongCall));
    }
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    localStorage.setItem("totalCallsToday", totalCallsToday.toString());
    localStorage.setItem("connectedCalls", connectedCalls.toString());
    localStorage.setItem("strongCall", strongCall.toString());
  }, [totalCallsToday, connectedCalls, strongCall]);

  const handleCall = () => {
    setTotalCallsToday((prevTotalCalls) => prevTotalCalls + 1);
    setShowConnectedOptions(true); // Show the connected options when the call button is clicked
  };

  const handleConnect = (connected) => {
    setIsConnected(connected);
    setShowConnectedOptions(false); // Hide connected options after selecting
    if (connected) {
      setConnectedCalls((prevConnectedCalls) => prevConnectedCalls + 1);
      setShowStrongOptions(true);
    }
  };

  const handleStrongCall = (isStrong) => {
    setIsStrongCall(isStrong);
    setShowStrongOptions(false); // Hide strong call options after selection
    if (isStrong) {
      setStrongCall((prevStrongCalls) => prevStrongCalls + 1);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear all called numbers?")) {
      setConnectedCalls(0);
      setTotalCallsToday(0);
      setStrongCall(0);
      localStorage.removeItem("totalCallsToday");
      localStorage.removeItem("connectedCalls");
      localStorage.removeItem("strongCall");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Phone Call List</h2>
        {error && <div className="text-red-500">{error}</div>}
        <div className="text-lg mb-4">{currentDate}</div>
        <div className="text-lg mb-4">
          <span className="font-semibold">Total Calls for Today:</span>{" "}
          <span className="text-blue-600">{totalCallsToday}</span>
        </div>
        {showConnectedOptions && (
          <div className="text-lg mb-4">
            <span className="text-sm">Was it Connected?:</span>{" "}
            <button
              onClick={() => handleConnect(true)}
              className="text-green-600 focus:outline-none"
            >
              <CheckCircleIcon className="w-6 h-6 inline-block" />
            </button>{" "}
            <button
              onClick={() => handleConnect(false)}
              className="text-red-600 focus:outline-none"
            >
              <XCircleIcon className="w-6 h-6 inline-block" />
            </button>
          </div>
        )}
        <div className="text-lg mb-4">
          <span className="font-semibold">Total Connected Calls:</span>{" "}
          <span className="text-green-600">{connectedCalls}</span>
        </div>
        <div className="text-lg mb-4">
          <span className="font-semibold">Total Strong Calls:</span>{" "}
          <span className="text-slate-950">{strongCall}</span>
        </div>
        {isConnected && showStrongOptions && (
          <div className="text-lg mb-4">
            <span className="text-sm">Was it a strong call?:</span>{" "}
            <button
              onClick={() => handleStrongCall(true)}
              className="text-green-600 focus:outline-none"
            >
              <CheckCircleIcon className="w-6 h-6 inline-block" />
            </button>{" "}
            <button
              onClick={() => handleStrongCall(false)}
              className="text-red-600 focus:outline-none"
            >
              <XCircleIcon className="w-6 h-6 inline-block" />
            </button>
          </div>
        )}
        <div className="flex justify-center">
          <button
            onClick={handleCall}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Call
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="mt-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneCallList;
