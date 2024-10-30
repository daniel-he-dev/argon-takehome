## Startup

This application is a Next.js application paired with an elasticsearch instance. The app is dockerized and can be composed via `docker-compose up` as long as you have docker installe.d

## Discussion

This project implements a simple Next.js frontend Table and Searchbar using standard MaterialUI components. The client-side uses a search API exposed by Next which connects to an elasticsearch instance to look through a clinical trials index. As part of the container orchestration process, elasticsearch ingests and indexes the clinical trials data, providing a wide array of search capabilities. Currently I only allow basic text search across a few fields but have exposed the necessary options to the client for filtering and table pagination.

With a better understanding of the intended use-case it would be relatively trivial to implement a better search UI, auto-suggestions, or allow advanced searches via Lucene syntax.
