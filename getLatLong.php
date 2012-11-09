<?php
exec(
	curl -X GET \
	-H "X-Parse-Application-Id: jM32k6jnO3Eb6VyLvRwxHKUbyiOmsQADopEOQAnd" \
	-H "X-Parse-REST-API-Key: bByV6zO4mbVh9Ou6CJ3yGongJvabUsIi0gf1uacD"  \
	-G \
	--data-urlencode 'where={"createdAt":{"$gte":{"__type":"Date","iso":"2011-08-21T18:02:52.249Z"}}}' \
	https://api.parse.com/1/classes/TestObject
)

echo .$_GET['PlaceLatitude']. $_GET['PlaceLongitude']
?>
