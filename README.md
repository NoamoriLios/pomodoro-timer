# Pomodoro timer app
Technika Pomodoro je druh metody organizace času, která využívá časovače k rozdělení úkolu na části tradičně 25 minut dlouhé a oddělené krátkými přestávkami. 

V této aplikaci může uživatel sám ovládat čas práce a přestávek, psat todo poznámky a v případě potřeby aktualizovat svůj časovač a zapnout Lo-Fi skladbu na pozadí pro soustředěnou práci.

Aplikace byla implementována pomocí knihovny React.

https://noamorilios.github.io/pomodoro-timer/ 

# Použité kategorie

Použitá svg grafika s nastavenými událostmi: 
```html
<svg onClick={playSound} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" 
    clipRule="evenodd" />
</svg>
```
Media prvky při zapínání a vypínání časovače a při zapinání hudby:
```js
const [audio] = useState(new Audio(url));

useEffect(() => {
        if (playing) {
            audio.volume = 0.05;
            audio.loop = true
            audio.play();
        } else {
            audio.pause(); }
        },
        [audio, playing]
    );
    ...
}
```

Formulařové prvky:
```html
<form id='newTodoForm' onSubmit={handleSubmit}>
    <input value={userInput} type="text" onChange={handleChange} autoFocus required placeholder="Enter task..."/>
</form>
```
Css transformace, transitions a vendor prefixy:
```css
.reload {
  width: 60px;
  height: 60px;
  transform: rotate(360deg);
  -webkit-transition: transform 0.5s;
  -ms-transition: transform 0.5s;
  -moz-transition: transform 0.5s;
  transition: transform 0.5s;
}

.reload:active {
  transform: rotate(0deg);
  transition: 0s;
  -webkit-transition: transform 0s;
  -ms-transition: transform 0s;
  -moz-transition: transform 0s;
}
```
Media queries:
```css
@media only screen and (max-width: 600px){
  main {
    padding-top: 10px;
  }
  .main_content {
    display: inline-block;
    justify-content: center;
    padding: 20px;
  }
  ...
}
```
Historie - aplikace je implementována v rámci jedné stránky a neprovádí navigaci po stránkách.

JS API Localstorage
```js
const [todos, setTodos] = useState(() => {
   const savedTodos = localStorage.getItem("todos");
   return savedTodos ? JSON.parse(savedTodos) :  tasks;
});

useEffect(() => {
   localStorage.setItem("todos", JSON.stringify(todos))
}, [todos])
...
```
Offline aplikace - naimplementováno pomocí service-worker:
```js
serviceWorker.register();
```


