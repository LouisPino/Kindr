import { useState } from "react"
var OpenAIApi  = require("openai");
require('dotenv')

const ChatbotApp = async () => {
  const openai = new OpenAIApi({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 4000,
      });
      //console.log("response", result.data.choices[0].text);
      setApiResponse(result.data.choices[0].text);
    } catch (e) {
      //console.log(e);
      setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };


  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: '100vh',
        }}
      >
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            value={prompt}
            placeholder="Please ask to openai"
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            disabled={loading || prompt.length === 0}
            type="submit"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
      </div>
      {apiResponse && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <pre>
            <strong>API response:</strong>
            {apiResponse}
          </pre>
        </div>
      )}
    </>
  );
};


export default ChatbotApp;







// import { useAuth0 } from "@auth0/auth0-react";
// import { Link } from "react-router-dom";

// import("./welcome.css");

// export default function Welcome() {
//   const { loginWithRedirect, logout, user, isLoading } = useAuth0();

//   return (
//     <>
//       <section className="welcome-page">
//         <h2 className="h2-header kindr-header">Welcome!</h2>
//         <p className="body-font welcome-emphasize">
//           We're so glad you're here.
//         </p>
//         <p className="body-font welcome-body">
//           Kindr is an app where you can do good things and inspire others to do
//           good. We're just a bunch of do-gooders 'round these parts.
//         </p>
//       </section>
//     </>
//   );
// }

// <header className="welcome">
// {!isLoading && !user && (
//   <button onClick={() => loginWithRedirect()}>LOGIN</button>
// )}
// {!isLoading && user && (
//   <>
//     <button onClick={() => logout()}> LOGOUT</button>
//   </>
// )}
// </header>
