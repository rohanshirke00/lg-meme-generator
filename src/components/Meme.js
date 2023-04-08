import React from 'react'
import html2canvas from 'html2canvas';

function Meme() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: ""
    })
    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage() {
            const randomNumber = Math.floor(Math.random() * allMemes.length)
            const url = allMemes[randomNumber].url
            setMeme(prevMeme => ({
                ...prevMeme,
                randomImage: url
            }))

    }

    function handleChange(event) {
        if(meme.randomImage === ""){
            alert("Please genrate a Meme!")
            return;
        }
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))

    }

    const getImage = () => {
        html2canvas(document.getElementById("capture"), { useCORS:true}).then(function (canvas){
            var imgBase64 = canvas.toDataURL();
               var a = document.createElement('a')
            var imgURL = "data:image/" + imgBase64;
            a.href = imgURL;
            a.download = "Meme_LG_" + new Date().getTime() + ".png";
            a.click();
            a.remove();
        });
    }


    return (
        <main>
            <div className='form'>
                <input
                    className='form-input'
                    type="text"
                    placeholder='Top text'
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    className='form-input'
                    type="text"
                    placeholder='Bottom text'
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button
                    onClick={getMemeImage}
                    className='form-button'>
                    Get a new meme image 🖼
                </button>
            </div>

            {meme.randomImage === "" ? <div className='init'>
                <h1 >Welcome to Meme Generator</h1>
                <p>Click above button to see random meme <i class="fa-regular fa-hand-point-up fa-2xl"></i></p>
            </div> :
                <div>
                    <div id='capture' className="meme">
                        <img src={meme.randomImage} alt="" className="meme--image" />
                        <h2 className="meme--text top">{meme.topText}</h2>
                        <h2 className="meme--text bottom">{meme.bottomText}</h2>
                    </div>
                    <button
                        onClick={getImage}
                        className='screenshot'>
                        Save <i class="icon fa-solid fa-image"></i>
                    </button>
                </div>
            }
        </main>
    )
}

export default Meme