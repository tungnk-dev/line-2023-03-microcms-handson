import "../styles/global.css";
import { useEffect, useState, createContext } from "react";

export const LiffContext = createContext({});

// const Counter = ({initialCount}) => {
//   const [count, setCount] = useState(initialCount);
//   return (
//     <>
//       Count: {count}
//       <button onClick={() => setCount(initialCount)}>Reset</button>
//       <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
//       <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
//     </>
//   );
// }

// useEffect(
//   () => {
//     updateData()
//     setLoad(false)
//   },
//   [load],
// );

// const themes = {
//   light: {
//     foreground: "#000000",
//     background: "#eeeeee"
//   },
//   dark: {
//     foreground: "#ffffff",
//     background: "#222222"
//   }
// };

// const ThemeContext = React.createContext(themes.light);

// function App() {
//   return (
//     <ThemeContext.Provider value={themes.dark}>
//       <Toolbar />
//     </ThemeContext.Provider>
//   );
// }

// function Toolbar(props) {
//   return (
//     <div>
//       <ThemedButton />
//     </div>
//   );
// }

// function ThemedButton() {
//   const theme = useContext(ThemeContext);
//   return (
//     <button style={{ background: theme.background, color: theme.foreground }}>
//       I am styled by theme context!
//     </button>
//   );
// }

export default function App({ Component, pageProps }) {
  // [liffObject, profile]
  const [[liffObject, profile], setLiffState] = useState([null, null]);
  useEffect(() => {
    if(!pageProps.liffId)return;
    import('@line/liff').then((liff) => {
      liff
        .init({ liffId: pageProps.liffId })
        .then(() => {
          if (liff.isLoggedIn()) {
            // プロフィール情報の取得をする
            liff
              .getProfile()
              .then((profile) => {
                setLiffState([liff, profile])
              })
              .catch((err) => {
                console.warn({ err })
              })
          } else {
            setLiffState([liff, null])
          }
        })
        .catch((err) => {
          console.warn({ err })
        })
    })
  }, [profile])
  return <LiffContext.Provider value={{liffObject: liffObject, profile: profile, setLiffState: setLiffState}}>
    <Component {...pageProps} />
  </LiffContext.Provider>
}
