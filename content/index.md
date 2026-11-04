---
title: Brian Alonso
description: Brian Alonso’s short stories and blog.
permalink: /
bodyClass: home
date: 2026-01-07
updated: 2026-01-07
---

Welcome to the internet home of Brian Alonso—aerospace engineer and writer based in Raleigh, North Carolina.

I use this site to publish [blogs](/blog) and occasional [short stories](/short-stories). Learn a little bit [about](/about) how I got here, what I'm up to [now](/now), and [ideas](/ideas) I have for the future. If this isn't what you're looking for, find my index of pages [here](/slashes).

## Check out my latest posts

{% assign latestPosts = collections.posts | reverse | slice: 0, 10 %}
{% render "post-list.liquid", posts: latestPosts %}
