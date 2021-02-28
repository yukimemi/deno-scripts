import { formatISO } from "https://deno.land/x/date_fns/index.js";
import * as color from "https://deno.land/std@0.88.0/fmt/colors.ts";
import * as path from "https://deno.land/std/path/mod.ts";

const input = async (): Promise<string> => {
  const title = await prompt("Enter new post title:");
  if (title === null) {
    return input();
  }
  return title;
};

const title = await input();
console.log(color.cyan(title));

const base = "./content";
const today = formatISO(new Date(), { representation: "date" });
const todayIso = formatISO(new Date(), {});
const post = path.join(base, `${today}_${title}.md`);

console.log(color.green(`Create new post: '${post}'`));

await Deno.writeTextFile(
  post,
  `+++
title = "${title}"
date = ${todayIso}
draft = true
[taxonomies]
tags = []
+++


<!-- more -->
`
);
