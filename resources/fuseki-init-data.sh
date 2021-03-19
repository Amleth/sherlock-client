set -x

http -a admin:coin -f POST http://localhost:3030/$/datasets dbName=iremus dbType=tdb2
http -a admin:coin GET http://localhost:3030/$/datasets

sleep 3

# EARS
curl -X DELETE -G http://localhost:3030/iremus/data --data-urlencode graph=http://data-iremus.huma-num.fr/graph/e13
curl -I -X POST -H Content-Type:text/turtle -T e13.ttl -G http://localhost:3030/iremus/data?graph=http://data-iremus.huma-num.fr/graph/e13

curl --data-urlencode "query=SELECT ?g (COUNT(*) as ?triples) WHERE { GRAPH ?g { ?s ?p ?o } } GROUP BY ?g" http://localhost:3030/iremus/sparql