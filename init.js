import GIRepo from 'gi://GIRepository';
import { getThisExtensionPath } from './misc.js';

let Repo = GIRepo.Repository;
// console.log('girepo search path', Repo.get_search_path())
Repo.prepend_search_path(getThisExtensionPath());
console.log('girepo search path', Repo.get_search_path());
// console.log('get_loaded_namespaces', Repo.get_default().get_loaded_namespaces())

// let libc = Repo.get_default().require_private(getThisExtensionPath(), 'libc', null, 0)
// let lib = Repo.get_default().require_private('/usr/lib/x86_64-linux-gnu/girepository-1.0/', 'GLib', null, 0)

// console.log('libc', libc)
// console.log('get_loaded_namespaces', Repo.get_default().get_loaded_namespaces())

/* To use `import libc from 'gi://libc'` from private location:
  GIRepository.Repository.prepend_search_path() must be put in another .js file,
  and import that .js file before import libc.
*/
// import libc from 'gi://libc'

/*
GIRepository.Repository.prepend_search_path() can be used with imports.gi.libc in the same .js file
*/
// let libc = imports.gi.libc;
