import subprocess,tempfile,os
def svg2png(bytestring,write_to,output_width,output_height):
    with tempfile.NamedTemporaryFile(suffix='.svg',delete=False) as f: f.write(bytestring); p=f.name
    subprocess.run(['node','/tmp/claude-1000/-home-elderle-amf-work-amf-app/8b7ee6c1-5db3-4233-8c49-f0276e88eeb3/scratchpad/g3fix/render.mjs',p,write_to],check=True); os.unlink(p)
