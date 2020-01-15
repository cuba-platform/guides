# CUBA Platform guides

This project contains the the sources for the CUBA Platform guides provided on https://cuba-platform.com/guides


## Creating a guide

1. create a file in `_drafts` directory (a good starting point is `guide-template.adoc`).
2. write the guide

## How guides will be deployed

Every guide that is under `_posts` in the master branch of this project will get picked up as a guide and be served by [Github pages](https://pages.github.com/).

The normal workflow is to create a not-complete guide in the `_drafts` directory as well as using PRs in this repository when it comes to releasing a guide.

## Running locally

In order to run locally, it is required to have the [Jekyll](https://jekyllrb.com/) based environment running.

### required environment

Mainly following the setup instructions on: https://jekyllrb.com/docs/#instructions

After `ruby`, `jeykll` and `bundler` is installed, execute `bundle install` in the project directory to get all required dependencies.


### running Jekyll locally

With that everything is setup in order to run `jekyll` locally

```
$ jekyll serve --config _config.yml
```

Then http://127.0.0.1:4000/ will serve the local guides

### running Jekyll locally with drafts

Normally it is useful to create the guide as a draft. In order to see them as well in the output, add the `--drafts` flag:

```
$ jekyll serve --drafts --config _config.yml 
```

### Using Docker

If you don't want to set up Ruby environment you can use jekyll Docker image

Pull jekyll image:
```
docker pull jekyll/jekyll:3.8
```

Build:
```
docker run --rm --volume="$PWD:/srv/jekyll" jekyll/jekyll:3.8 jekyll build
```

Serve:
```
docker run --rm --volume="$PWD:/srv/jekyll" -p 4000:4000 jekyll/jekyll:3.8 jekyll serve
```

#### Speed-up docker build using builder image 

Using pure `jekyll` image causes dependencies (gems) being installed each time. In order to speed-up builds on CI 
we prepare image with all required gems.

Create image: 

```
docker build -f docker/builder/Dockerfile -t cuba-platform/guides-builder . 
```

Build using docker image:

```
docker run --rm --volume="$PWD:/srv/jekyll" cuba-platform/guides-builder jekyll build
```