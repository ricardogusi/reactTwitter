import React, { useState, useEffect } from "react";
import "./Timeline.css";
import twitterLogo from "../twitter.svg";
import api from "../services/api";
import Tweet from "../components/Tweet";
import socket from "socket.io-client";

export default function Timeline() {
  const [newTweet, setNewTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const getData = async () => {
    const response = await api.get("tweets");
    setTweets(response.data);
  };

  useEffect(() => {
    getData();

    subscribeToEvents();
  }, []);

  const subscribeToEvents = () => {
    const io = socket("http://localhost:3000");

    io.on("tweet", (data) => {
      setTweets([data, ...tweets]);
      getData()
    });
    io.on("like", (data) => {
      setTweets(tweets.map((tweet) => (tweet._id === data._id ? data : tweet)));
      getData()
    });
  };

  const handleInputChange = (e) => {
    setNewTweet(e.target.value);
  };

  const handleNewTweet = async (e) => {
    if (e.keyCode !== 13) return;

    const content = newTweet;
    const author = localStorage.getItem("@goTwitter:username");

    await api.post("tweets", { content, author });

    setNewTweet("");
  };

  return (
    <div className="timeline-wrapper">
      <img height={24} src={twitterLogo} alt="goTwitter" />

      <form>
        <textarea
          value={newTweet}
          onChange={handleInputChange}
          onKeyDown={handleNewTweet}
          placeholder="O que está acontecendo?"
        />
      </form>
      <ul className="tweet-list">
        {tweets.map((tweet) => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </ul>
    </div>
  );
}
