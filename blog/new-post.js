var md_path = process.argv[2]
var title = process.argv[3]

if (!md_path || !title ){
  console.log('insuff args');
  process.exit();
}

var ejs = require('ejs')
var fs = require('fs')
var marked = require('marked')
var cheerio = require('cheerio')

var md = fs.readFileSync('./'+md_path, 'utf8')
var landing = fs.readFileSync('./views/classes.ejs', 'utf8')
var template = fs.readFileSync('./templates/post.ejs', 'utf8')

var url = title.split(' ').join('-').toLowerCase();

var rendered = ejs.render(template, {
  title: title,
  url:url,
  content:marked(md)
});

//write the view file
fs.writeFileSync('./views/'+url+'.ejs', rendered)

var $ = cheerio.load(landing);

var url_full = 'http://myles.io/thoughts/'+url

//TODO : remove the link if it already exists (iterative viewing-ness)
$('a[href="'+url_full+'"]').remove() && $('br').first().remove()

//rewrite landing page with link
$('.blog-links').prepend('\n<a href="'+url_full+'">'+title+'</a><br>')
fs.writeFileSync('./views/classes.ejs', $.html())

console.log('http://localhost:8000/thoughts/'+url)
