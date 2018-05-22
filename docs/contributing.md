# How to contribute to Sela codebase
This document goes into a few rules we set for ourselves to seamlessly collaborate toward our development goals.

## Branch: Master
This is the production branch. It is stable, and rarely gets updated.

## Branch: Development
This is the main development branch. It should only get updated by Pull Request (PR) from other branches.

## New Feature
A feature should be considered as small as possible. When working on a new feature, create a new branch by checking out from `development` branch. The new branch name should follow this convention: `[your_username]/[feature_name]`
To summarize:
```
> git checkout development
> git pull origin development
> git checkout -b konoufo/new_dashboard_chart
```
You should work on this new branch until the feature is complete. A new feature branch should be removed after a pull request to the `development` branch.
That's it. Go on building awesome stuff !
