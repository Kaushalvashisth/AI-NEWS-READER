import React,{useEffect,useState} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
// import classes from '*.module.css';
import {Typography} from '@material-ui/core';
import useStyles from './styles.js';
import  wordsToNumbers  from 'words-to-numbers';

const alanKey='bb8559525e1057ca127510457835a5d82e956eca572e1d8b807a3e2338fdd0dc/stage';
const App=()=>{
    const [newsArticles,setNewsArticles]=useState([])
    const [activeArticle,setActiveArticle]=useState(-1);

    const classes=useStyles();
    useEffect(()=>{
        alanBtn({
            key:alanKey,
            onCommand:({command,articles,number})=>{
                if(command==='newHeadLines'){
                    // console.log(articles);
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }else if(command==='highlight'){
                    setActiveArticle((prev)=>prev+1);
                }else if(command==='open'){
                    console.log(number);
                    const parsedNumber =number.length>2 ? wordsToNumbers(number, {fuzzy:true}):null;
                    const article=articles[parsedNumber-1];

                    if(parsedNumber>20){
                        alanBtn.playText("Please try that again.")
                    }else if(article){
                        window.open(article.url,'_blank');
                        alanBtn().playText('opening');
                    }
                    window.open(article[number].url,'_blank');
                }
            }
        })
    },[])//empty array means run only 1 time on start
    return (
        <div>
            <div className={classes.logo}>
                {newsArticles.length ? (
                <div className={classes.infoContainer}>
                    <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
                    <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
                </div>
                ) : null}
                <img src="https://artificialintelligence-news.com/wp-content/uploads/sites/9/2020/03/ai-newsv4-2-svg.png" className={classes.Logo} alt="News Logo"/> 
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
            <footer className={classes.footer}>
                <strong>Made with &#10084; Kaushal Vashisth</strong>
            </footer>
        </div>
    )
}
export default App;