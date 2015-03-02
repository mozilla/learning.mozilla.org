#! /usr/bin/env python

import os
import sys
import subprocess
import argparse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

s3bucket = 'mozilla-learning-html'

parser = argparse.ArgumentParser(
    description='Build optimized bundle and upload to S3.'
)
parser.add_argument(
    '--dry-run', action='store_true',
    help='Don\'t actually upload to S3.'
)

args = parser.parse_args()

print "Exporting build to s3://%s.\n" % (s3bucket,)

def call(cmdline):
    cmdline = cmdline % {
        'BUCKET': s3bucket
    }
    print 'Executing "%s"' % cmdline
    if sys.platform == 'win32':
        subprocess.check_call([
            "bash", "-c", cmdline
        ], cwd=ROOT)
    else:
        subprocess.check_call(cmdline, shell=True, cwd=ROOT)

def call_s3cmd(cmdline, caching='max-age=600'):
    flags = ['--acl-public',
             "--add-header 'Cache-Control:%s'" % caching]
    if args.dry_run:
        flags.append("--dry-run")
    cmdline = "s3cmd " + ' '.join(flags) + " " + cmdline
    call(cmdline)

call("rm -rf dist")
call("node_modules/.bin/gulp")

# The '/' after 'dist' is REALLY important here.
call_s3cmd("sync --delete-removed dist/ s3://%(BUCKET)s")

call("gzip -c -9 dist/bundle.js > dist/bundle.js.gz")
call_s3cmd("put -m application/javascript "
           "--add-header 'Content-Encoding:gzip' dist/bundle.js.gz "
           "s3://%(BUCKET)s/bundle.js")

print "Build synced to http://%s.s3-website-us-east-1.amazonaws.com/." % (
    s3bucket
)
