#! /bin/bash
echo 'export PATH=$PATH:/usr/local/bin' >> $HOME/.bashrc
source $HOME/.bashrc
cd /Users/abdullahtufail/andrew-post-playlist && /usr/local/bin/node

var1="BQAI1FuoHekCTW_fXILyFQEix8akJnGkT-YTRjlp_C-21KeMUKhAXqJKqwiRlkZS9ZYAvEFVLeRuJ_gZghiKNm41Q9fI-L39sUnL8z_FWfWwKxgC-T2JKei9K6hB3m_i8GzrGXRkp2zx5C5ozP80mz1lJD2nw9cqz_N2zXwvg6HDBx8qNnIVPO5vPekK_W0hxDe-iTlDOBevrBM-DEqJScdIw4QLa_8yPCJKYc2zo5jxb_OYQIPZPMw";
var2="5WyJ4LUa23CwRlyuRPD7XA";

filename='/Users/abdullahtufail/andrew-post-playlist/books.txt'
n=1
while IFS= read -r line; do
# reading each line
echo "Line No. $n : $line"
n=$((n+1))
var3=$line
done < $filename

node sh-testing.js $var1 $var2 $var3

