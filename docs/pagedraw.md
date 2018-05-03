# How to use Pagedraw
Pagedraw.io is an alternative to coding a design with markup and CSS. We use Pagedraw to builtd the presentational components of the React app.
## Start Here
This little [fiddle](https://pagedraw.io/fiddles/DinV9PIR2Prt) helps understanding how to combine the pagedraw-generated components with hand-coded container components that hydrate them with data.
## Pagedraw Sync
Pagedraw has a **CLI** that once installed locally on your computer enables you to pull the components created on Pagedraw into your local project. This is our directory structure:
```
.
+--client
|  +--src
|     +--pagedraw
+--pagedraw.json
```

When in the same directory as `pagedraw.json`, running
```
> pagedraw sync
```
will cause the components created on Pagedraw.io to be sent into `client/src/pagedraw` folder.
