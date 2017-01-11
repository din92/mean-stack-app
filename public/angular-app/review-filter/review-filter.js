app.filter("range",function(){
	return function(val,range)
	{
		range = parseInt(range,10);
		for (var i = 0; i < range; i++) {
			val.push(i);
			return val;
		};
	}
})