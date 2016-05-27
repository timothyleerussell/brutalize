#brutalize

Get your own faux Brutalist Website redesign in 3 easy steps.

Automated layout inspired by the spirit of [Brutalist Websites](http://brutalistwebsites.com/)

##Example:

	Before:	[https://anatone.net](https://anatone.net)
	After:	[https://anatone.net?brutalize=true](https://anatone.net?brutalize=true)


###1. Add this to the head of your page

```javascript
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="brutalize.js"></script>

<script>	
function UpdateQueryString(key, value, url) {
		
		//Credit: UpdateQueryString - @ellemayo - http://stackoverflow.com/a/11654596/12919
		
    if (!url) url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
                url += '#' + hash[1];
            return url;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
                url += '#' + hash[1];
            return url;
        }
        else
            return url;
    }
}
</script>
```

###2. Add this to the body of your page.

```html
	<a href="#" onclick="window.location.href = UpdateQueryString('brutalize', 'true'); return false;">Brutalize this page now!</a>
```

###3. Click the link to faux brutalize your page using hyper-advanced layout AI.

* Click the link

####More about Brutalism:

* [Photographs of Brutalist Architecture @ Atlas Obscura](http://www.atlasobscura.com/articles/starkly-beautiful-brutalist-buildings-photographed-in-black-and-white)
* [Photographs @ Architectural Digest](http://www.architecturaldigest.com/story/brutalist-architecture-masterpieces)
 