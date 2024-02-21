for i in $(seq 1 20); do
  echo "Iteration $i"
  export PLATFORM_VERSION=iOS15
  saucectl run
done