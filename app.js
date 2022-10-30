const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { auth ,claimIncludes} = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
var parser = require('body-parser');
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.use(function(req,res,next){
  res.locals.userValue = null;
  next();
})
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET || 'Something',
  baseURL: 'https://web2-lab1-pf4d.onrender.com', //process.env.APP_URL || 'https://web2-lab1-pf4d.onrender.com/',
  clientID: process.env.CLIENT_ID || 'fQjSot189Zzto9YLOD3TdwXBYSZ8iZlw',
  issuerBaseURL: 'https://dev-8e36uq261bya3e5h.us.auth0.com'
};

app.set('view engine', 'ejs')
app.use(auth(config));
kolo = [[['Istra',0,2,'Hajduk'],['Varaždin',0,1,'Slaven Belupo'],['Šibenik',0,1,'Rijeka'],['Osijek',2,1,'Gorica'],['Dinamo',3,2,'Lokomotiva']],[['Lokomotiva',2,1,'Osijek'],['Slaven Belupo',1,5,'Dinamo'],['Gorica',0,0,'Šibenik'],['Istra',0,2,'Varaždin'],['Hajduk',2,0,'Rijeka']],[['Rijeka',1,1,'Gorica'],['Osijek',0,0,'Slaven Belupo'],['Varaždin',0,2,'Hajduk'],['Dinamo',4,1,'Istra'],['Šibenik',2,1,'Lokomotiva']],[['Lokomotiva',3,1,'Rijeka'],['Istra',1,0,'Osijek'],['Slaven Belupo',0,0,'Šibenik'],['Varaždin',1,1,'Dinamo'],['Hajduk',3,1,'Gorica']],[['Rijeka',0,1,'Slaven Belupo'],['Osijek',2,2,'Varaždin'],['Dinamo',4,1,'Hajduk'],['Gorica',3,2,'Lokomotiva'],['Šibenik',0,0,'Istra']],[['Hajduk',2,1,'Lokomotiva'],['Istra',1,1,'Rijeka'],['Dinamo',5,2,'Osijek'],['Varaždin',2,2,'Šibenik'],['Slaven Belupo',2,1,'Gorica']],[['Osijek',2,1,'Hajduk'],['Šibenik',1,2,'Dinamo'],['Rijeka','-','-','Varaždin'],['Lokomotiva','-','-','Slaven Belupo'],['Gorica','-','-','Istra']],[['Hajduk','-','-','Slaven Belupo'],['Istra','-','-','Lokomotiva'],['Osijek','-','-','Šibenik'],['Varaždin','-','-','Gorica'],['Dinamo','-','-','Rijeka']],[['Lokomotiva','-','-','Varaždin'],['Slaven Belupo','-','-','Istra'],['Gorica','-','-','Dinamo'],['Rijeka','-','-','Osijek'],['Šibenik','-','-','Hajduk']]]
komentari=[[['gecekay370','10/11/2022','Super tekma!'],['noyic25870','10/11/2022','Ma imali su srece..']],[['noyic25870','10/21/2022','Super igra Varazdin!']],[],[['gecekay370','9/7/2022','Losa utakmica Hajduka...']],[['noyic25870','1/11/2022','Bravo Petko!']],[],[['gecekay370','10/11/2022','Nije lose'],['noyic25870','10/11/2022','Istra!!!']],[['noyic25870','10/11/2022','Istra!!']],[['gecekay370','10/11/2022','Ajmo Dinamo!!'],['noyic25870','10/11/2022','Bravo svima, super nogomet']]]

data = [['Dinamo',3,4,5,6,7],['Hajduk',3,4,5,6,7],]


app.get('/', (req, res) => {
  data = []
  pom = {}
  var ct = 0
  console.log("Krećemo")
  for (let i = 0; i < kolo.length; i++){
    for (let z = 0; z < kolo[i].length; z++){
      
        j = kolo[i][z]


      if (j[1] == '-'){
          continue
        }
      ct+=1
        console.log("JJ")
        console.log(j)
        console.log(j[1])
      if (!(j[0] in pom)){
        
        pom[j[0]] = [0,0,0,0,0]
      }
      if (!(j[3] in pom)){
        pom[j[3]] = [0,0,0,0,0]
      }

      if (parseInt(j[1]) > parseInt(j[2])){
        pom[j[0]][4] =pom[j[0]][4] +  3
        pom[j[0]][0] = pom[j[0]][0] + 1
        pom[j[3]][2] =pom[j[3]][2] + 1
        pom[j[0]][3] = pom[j[0]][3] + Math.abs(parseInt(j[1])-parseInt(j[2]))
        pom[j[3]][3] = pom[j[3]][3] + -Math.abs(parseInt(j[1])-parseInt(j[2]))
      }else if (parseInt(j[1]) < parseInt(j[2])){
        pom[j[3]][4]= pom[j[3]][4] + 3
        pom[j[3]][0] = pom[j[3]][0] + 1
        pom[j[0]][2]= pom[j[0]][2]+ 1
        pom[j[0]][3] = pom[j[0]][3] + -Math.abs(parseInt(j[1])-parseInt(j[2]))
        pom[j[3]][3] = pom[j[3]][3] + Math.abs(parseInt(j[1])-parseInt(j[2]))
      }else{
        pom[j[0]][4] = pom[j[0]][4] + 1
        pom[j[3]][4] =pom[j[3]][4] +  1
        pom[j[0]][1] =pom[j[0]][1]+ 1
        pom[j[3]][1] =pom[j[3]][1] + 1
      }
    }
    } 
  console.log(pom)

  for (var i in pom){
    data.push([i,pom[i][0],pom[i][1],pom[i][2],pom[i][3],pom[i][4]])
  }
  data.sort((a,b) => { return b[5]-a[5] || b[4]-a[4]})
  console.log(ct)
  login:req.oidc.isAuthenticated() ? res.render('index', {nick: req.oidc.user['nickname'],data: data,ath:true}) :res.render('index', {nick:"-", data: data,ath:false})
  
  //res.sendFile(__dirname+"/main.html")
  //res.send(req.oidc.isAuthenticated() ? 'Hello World!' : 'Not logged in!')
})
app.get('/mw', (req, res) => {
  req.oidc.isAuthenticated() && req.oidc.user['nickname']=='behaf51522' ? res.render('mwadmin', {nick: req.oidc.user['nickname'],ath:true, kolo: kolo}) : res.render('mw', {nick:'-',ath:false, kolo: kolo,komentari:komentari})
  //res.sendFile(__dirname+"/main.html")
  //res.send(req.oidc.isAuthenticated() ? 'Hello World!' : 'Not logged in!')
})
app.get('/comments', (req, res) => {
  req.oidc.isAuthenticated() ? req.oidc.user['nickname']=='behaf51522' ? res.render('comments', {ath:true, admin :true,kolo: komentari,nick:req.oidc.user['nickname']}): res.render('comments', {ath:true, admin :false,kolo: komentari,nick:req.oidc.user['nickname']}) : res.render('comments', {ath:false,admin:false, kolo: komentari,nick:"0"})

})
app.post('/mwpost', (req, res) => {
  console.log(req.body)
  for (var key in req.body){
      pom = key.split(" ")
      kolo[parseInt(pom[0])][parseInt(pom[1])][parseInt(pom[2])] = req.body[key]
  }
  res.redirect('/mw')
})

app.post('/commentpost', (req, res) => {
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
  console.log(req.body)
  for (var key in req.body){
      pom = key.split(" ")
      komentari[parseInt(pom[0])].push([pom[1],today,req.body[key]])
      console.log(req.body[key])
  }
  res.redirect('/comments')
})

app.post('/commentdel', (req, res) => {
  console.log(req.body)
  for (var key in req.body){
    pom = key.split(" ")
    komentari[parseInt(pom[0])].splice(parseInt(pom[1]),1)
}
  res.redirect('/comments')
})

app.post('/commchg', (req, res) => {
  console.log(req.body)
  for (var key in req.body){
    pom = key.split(" ")
    komentari[parseInt(pom[0])][parseInt(pom[1])][2] = req.body[key]
}
  res.redirect('/comments')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
