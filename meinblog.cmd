checkout_dir="${HOME}/html/meinblog"

repo_url='https://github.com/astridx/meinblog.git'
if [ ! -d "${checkout_dir}" ]; then
mkdir -p "${checkout_dir}" && git clone "${repo_url}" "${checkout_dir}"
  else
cd "${checkout_dir}" && git pull
fi