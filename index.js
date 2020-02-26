const express = require("express");
const bodyparser = require("body-parser");
const filesystem = require("fs");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const saveFile = (artist, about, url) => {
    filesystem.readFile('public/artists.json', (err, data) => {
        if (err) filesystem.writeFile('public/artists.json', '[]', (err) => {
            if (err) return;
        })
        try {
            artistarray = JSON.parse(data);
            artistarray.push({ "artist": artist, "about": about, "url": url });
            filesystem.writeFile('public/artists.json', JSON.stringify(artistarray), (err) => {
                if (err) return
            })
        } catch (e) {
            console.log(e);
        }
    })

}


const checkIfFileExists = () => {
    filesystem.readFile('public/artists.json', (err, data) => {
        if (err) filesystem.writeFile('public/artists.json', '[]', (err) => {
            if (err) return;
        })
        try {
            artistObject = JSON.parse(data);
            console.log(artistObject);
        } catch (e) {
            filesystem.writeFile('public/artists.json', '[]', (err) => {
                if (err) return;
            })
        }
    })
}

const deleteFromFile = (artist, about, url) => {
    filesystem.readFile('public/artists.json', (err, data) => {
        if (err) return;
        artistarray = JSON.parse(data);
        artistarray.forEach((artistObj, index, arr) => {
            if (artistObj.artist === artist) {
                if (artistObj.about === about) {
                    if (artistObj.url === url) {
                        arr.splice(index, 1);
                        filesystem.writeFile('public/artists.json', JSON.stringify(arr), (err) => {
                            if (err) return;
                        })
                    }
                }
            }
        })
    })
}

checkIfFileExists();
app.get('/add', (req, res) => {
    filesystem.readFile('public/artists.json', (err, data) => {
        if (err) return;
        return res.json(JSON.parse(data))

    })

})


app.post('/add', (req, res) => {
    console.log("adding")
    saveFile(req.body.artist, req.body.about,req.body.url);
    const data = req.body;
    res.json({
        artist: data.artist,
        about: data.about,
        url: data.url
    })

})

app.post('/delete', (req, res) => {
    console.log("cunt")
    deleteFromFile(req.body.artist, req.body.about,req.body.url);
    const data = req.body;
    res.json({
        artist: data.artist,
        about: data.about,
        url: data.url
    })

})

app.get('/search',(req,rest) => {
    filesystem.readFile('public/artists.json', (err,data) => {
        if (err) return;
        return res.json(JSON.parse(data))
    });
})

app.listen(process.env.PORT || 3000, ()=> console.log("server is available"))